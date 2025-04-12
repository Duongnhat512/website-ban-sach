package org.learning.authenticationservice.controller.external;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.dto.request.OTPRequest;
import org.learning.authenticationservice.dto.request.UserRequest;
import org.learning.authenticationservice.dto.response.PageResponse;
import org.learning.authenticationservice.dto.response.ResponseData;
import org.learning.authenticationservice.dto.response.UserResponse;
import org.learning.authenticationservice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth/user")
public class UserController {

    private final UserService userService;
    @PostMapping("/create-user")
    public ResponseData<UserResponse> createUser(@RequestBody UserRequest request, @RequestParam String otp){
        return ResponseData.<UserResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create User Successfully")
                .result(userService.createUser(request,otp))
                .build();
    }
    @GetMapping("/get-all-users")
    public ResponseData<PageResponse<UserResponse>> getAllUsers(@RequestParam (defaultValue = "1") int page,
                                                                @RequestParam(defaultValue = "10") int size,
                                                                @RequestParam(value = "sort") String sort){
        return ResponseData.<PageResponse<UserResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Get All Users Successfully")
                .result(userService.getUsers(page,size,sort))
                .build();
    }

    @GetMapping("{id}")
    public ResponseData<UserResponse> getUserById(@PathVariable Long id) {
        try {
            UserResponse response = userService.getUserById(id);
            return ResponseData.<UserResponse>builder()
                    .message("Get User Successfully")
                    .code(HttpStatus.OK.value())
                    .result(response)
                    .build();
        } catch (RuntimeException ex) {
            return ResponseData.<UserResponse>builder()
                    .message("User Not Found")
                    .code(HttpStatus.NOT_FOUND.value())
                    .result(null)
                    .build();
        }
    }

    @PostMapping("/send-otp-register")
    public ResponseData<Void> sendOtpByEmail(@RequestBody OTPRequest email){
        userService.sendOtpByEmail(email);
        return ResponseData.<Void>builder()
                .message("Send OTP Successfully")
                .code(HttpStatus.OK.value())
                .build();
    }
    @DeleteMapping("/delete/{id}")
    public ResponseData<UserResponse> deleteUser(@PathVariable Long id) {
        try {
            UserResponse response = userService.deleteUser(id);
            return ResponseData.<UserResponse>builder()
                    .message("Delete User Successfully")
                    .code(HttpStatus.OK.value())
                    .result(response)
                    .build();
        } catch (RuntimeException ex) {
            String errorMessage = ex.getMessage();
            if ("User not found".equals(errorMessage)) {
                return ResponseData.<UserResponse>builder()
                        .message("User Not Found")
                        .code(HttpStatus.NOT_FOUND.value())
                        .result(null)
                        .build();
            } else if ("Cannot delete admin user".equals(errorMessage)) {
                return ResponseData.<UserResponse>builder()
                        .message("Cannot delete admin user")
                        .code(HttpStatus.BAD_REQUEST.value())
                        .result(null)
                        .build();
            }

            return ResponseData.<UserResponse>builder()
                    .message("Unexpected error: " + errorMessage)
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .result(null)
                    .build();
        }
    }


    @PutMapping("/update/{id}")
    public ResponseData<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest request) {
        try {
            UserResponse response = userService.updateUser(id, request);
            return ResponseData.<UserResponse>builder()
                    .message("Update User Successfully")
                    .code(HttpStatus.OK.value())
                    .result(response)
                    .build();
        } catch (RuntimeException ex) {
            return ResponseData.<UserResponse>builder()
                    .message("User Not Found")
                    .code(HttpStatus.NOT_FOUND.value())
                    .result(null)
                    .build();
        }
    }

    @GetMapping("/total-user")
    public ResponseData<Long> totalUser(){
        return ResponseData.<Long>builder()
                .message("Total User Successfully")
                .code(HttpStatus.OK.value())
                .result(userService.totalUser())
                .build();
    }
}
