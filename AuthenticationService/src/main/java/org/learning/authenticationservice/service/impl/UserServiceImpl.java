package org.learning.authenticationservice.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.common.RoleName;
import org.learning.authenticationservice.dto.request.OTPRequest;
import org.learning.authenticationservice.dto.request.UserRequest;
import org.learning.authenticationservice.dto.response.PageResponse;
import org.learning.authenticationservice.dto.response.UserResponse;
import org.learning.event.NotificationEvent;
import org.learning.authenticationservice.mapper.UserMapper;
import org.learning.authenticationservice.model.Role;
import org.learning.authenticationservice.model.User;
import org.learning.authenticationservice.repository.RoleRepository;
import org.learning.authenticationservice.repository.UserRepository;
import org.learning.authenticationservice.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final KafkaTemplate<String,Object> kafkaTemplate;
    private final RedisService redisService;

    @Override
    public UserResponse getUserById(Long id) {
        return userMapper.toUserResponse(userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found")));
    }

    @Override
    public UserResponse createUser(UserRequest request,String otp) {
        if(userRepository.existsByEmail(request.getEmail())){
            log.error("Email already exists");
            throw new RuntimeException("Email already exists");
        }
        String storedOtp = redisService.get(request.getEmail());
        if(storedOtp == null || !storedOtp.equals(otp)){
            log.error("OTP not found");
            throw new RuntimeException("OTP not found");
        }
        User user = userMapper.toUser(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Role role = roleRepository.findByName(RoleName.USER.name()).orElseThrow(()->new RuntimeException("Role not found"));
        user.setRole(role);
        user.setFullName(request.getFirstName()+ " "+ request.getLastName());

        try{
            user = userRepository.save(user);
            NotificationEvent notificationEvent = NotificationEvent.builder()
                    .channel("EMAIL")
                    .recipient(user.getEmail())
                    .templateCode("welcome-email")
                    .subject("Welcome to Fahasa")
                    .build();

            kafkaTemplate.send("notification-delivery",notificationEvent);
            return userMapper.toUserResponse(user);
        }catch (Exception e){
            log.error("Error while saving user", e);
            throw new RuntimeException("Error while saving user");
        }
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest request) {
        // Lấy thông tin người dùng hiện tại
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));

        // Cập nhật thông tin người dùng
        existingUser.setFirstName(request.getFirstName());
        existingUser.setLastName(request.getLastName());
        existingUser.setEmail(request.getEmail());
        existingUser.setDob(request.getDob());
        existingUser.setPhoneNumber(request.getPhoneNumber());
        // Thêm các trường khác cần cập nhật

        // Lưu người dùng đã cập nhật
        User updatedUser = userRepository.save(existingUser);

        // Chuyển đổi User thành UserResponse
        return userMapper.toUserResponse(updatedUser);
    }

    @Override
    public UserResponse deleteUser(Long id) {
        UserResponse userResponse = getUserById(id);
        userRepository.deleteById(id);
        return userResponse;
    }

    @Override
    public PageResponse<UserResponse> getUsers(int page, int size) {
        Page<User> userPage = userRepository.findAll(PageRequest.of(page-1, size));
        List<UserResponse> userResponses = userPage.get().map(userMapper::toUserResponse).collect(Collectors.toList());
        return PageResponse.<UserResponse>builder()
                .currentPage(page)
                .totalElements(userPage.getTotalElements())
                .result(userResponses)
                .totalPages(userPage.getTotalPages())
                .build();
    }

    @Override
    public void sendOtpByEmail(OTPRequest request) {

        if(userRepository.existsByEmail(request.getEmail())){
            log.error("Email already exists");
            throw new RuntimeException("Email already exists");
        }
        StringBuilder content = new StringBuilder();
        String otp = generateOTP();

        redisService.save(request.getEmail(),otp,30, TimeUnit.MINUTES);

        content.append("<html>")
                .append("<body style='font-family: Arial, sans-serif; line-height: 1.6;'>")
                .append("<h2 style='color: #4CAF50;'>Welcome to T1 Team!</h2>")
                .append("<p>Dear <strong>")
                .append(request.getEmail())
                .append("</strong>,</p>")
                .append("<p>Thank you for registering with <strong>T1 Team</strong>. We are excited to have you on board!</p>")
                .append("<p style='font-size: 18px;'><strong>Your OTP Code is:</strong> ")
                .append("<span style='font-size: 22px; color: #FF5733;'><strong>")
                .append(otp)
                .append("</strong></span></p>")
                .append("<p><strong>Note:</strong> This OTP is valid for <em>5 minutes</em>. Please enter it as soon as possible to complete your registration.</p>")
                .append("<p>If you did not request this code, please ignore this email. For your security, do not share this code with anyone.</p>")
                .append("<br/>")
                .append("<p>Best regards,</p>")
                .append("<p><strong>T1 Team</strong></p>")
                .append("</body>")
                .append("</html>");
        NotificationEvent event = NotificationEvent.builder()
                .channel("EMAIL")
                .recipient(request.getEmail())
                .templateCode(String.valueOf(content))
                .subject("OTP Verification")
                .build();
        kafkaTemplate.send("notification-otp",event);
        log.info("OTP sent to {}",request.getEmail());
    }
    private static String generateOTP(){
        StringBuilder stringBuilder = new StringBuilder();
        for(int i = 1 ;i <=6;i++){
            stringBuilder.append(new Random().nextInt(10));
        }
        return stringBuilder.toString();
    }


}
