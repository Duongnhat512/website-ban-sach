package org.learning.authenticationservice.service.impl;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.dto.request.SignInRequest;
import org.learning.authenticationservice.dto.response.AuthenticationResponse;
import org.learning.authenticationservice.model.User;
import org.learning.authenticationservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {
    private final UserRepository userRepository;

    @NonFinal
    @Value("${jwt.secret-key}")
    private String secret_key;

    public AuthenticationResponse signIn(SignInRequest request){
        log.info("Sign in request for user {}",request.getEmail());

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow(()->new RuntimeException("User not found"));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean authenticated = passwordEncoder.matches(request.getPassword(),user.getPassword());
        if(!authenticated){
            throw new RuntimeException("Invalid credentials");
        }
        var token = generateToken(user);

        return AuthenticationResponse.builder()
                .authenticated(true)
                .role(user.getRole().getName())
                .token(token)
                .build();
    }



    public String generateToken(User user){
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issueTime(new Date())
                .issuer("Book Microservice")
                .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.DAYS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope",buildScope(user))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(jwsHeader, payload);
        try{

            jwsObject.sign(new MACSigner(secret_key.getBytes()));
            return jwsObject.serialize();
        }catch (Exception e){
            log.error("Error while generating token",e);
            throw new RuntimeException(e);
        }

    }

    private String buildScope(User user){
        StringJoiner joiner = new StringJoiner(" ");
        Optional.ofNullable(user.getRole()).ifPresent(role-> {
            joiner.add(role.getName());
        });
        return joiner.toString();
    }

}
