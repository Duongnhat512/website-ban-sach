package org.example.fileservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.fileservice.service.CloudinaryService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/files")
public class FileController {

    private final CloudinaryService cloudinaryService;
    @PostMapping("/upload")
    public String uploadFile(@RequestPart("image") MultipartFile image) {
        return cloudinaryService.uploadImage(image);
    }

}
