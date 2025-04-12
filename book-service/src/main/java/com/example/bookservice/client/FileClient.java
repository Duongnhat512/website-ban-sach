package com.example.bookservice.client;


import com.example.bookservice.config.FeignSupportConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "FILE-SERVICE", configuration = FeignSupportConfig.class)
public interface FileClient {
    @PostMapping(value = "/internal/files/upload", consumes = "multipart/form-data")
    String getStringUrl(@RequestPart("image") MultipartFile file);
}

