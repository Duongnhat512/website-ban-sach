package org.learning.authenticationservice.controller.external;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.dto.request.UserRequest;
import org.learning.authenticationservice.dto.response.ResponseData;
import org.learning.authenticationservice.dto.response.UserResponse;
import org.learning.authenticationservice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    @PostMapping("/create-user")
    public ResponseData<UserResponse> createUser(@RequestBody UserRequest request){
        return ResponseData.<UserResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create User Successfully")
                .result(userService.createUser(request))
                .build();
    }
    @GetMapping("/get-all-users")
    public ResponseData<List<UserResponse>> getAllUsers(){
        return ResponseData.<List<UserResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Get All Users Successfully")
                .result(userService.getUsers())
                .build();
    }

    @GetMapping("{id}")
    public ResponseData<UserResponse> getUserById(@PathVariable Long id){
        return ResponseData.<UserResponse>builder()
                .message("Get User Successfully")
                .code(HttpStatus.OK.value())
                .result(userService.getUserById(id))
                .build();
    }




    @GetMapping("/delete/{id}")
    public ResponseData<UserResponse> deleteUser(@PathVariable Long id){
        return ResponseData.<UserResponse>builder()
                .message("Delete User Successfully")
                .code(HttpStatus.OK.value())
                .result(userService.deleteUser(id))
                .build();
    }


    @PutMapping("/update/{id}")
    public ResponseData<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest request){
        return ResponseData.<UserResponse>builder()
                .message("Update User Successfully")
                .code(HttpStatus.OK.value())
                .result(userService.updateUser(id, request))
                .build();
        }
}
