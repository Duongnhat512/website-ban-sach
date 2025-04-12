package org.example.fileservice.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor

public class CloudinaryService {
    private final Cloudinary cloudinary;
    public String uploadImage(MultipartFile image) {
        try {
            if (image.isEmpty()) {
                return "File rỗng, vui lòng chọn ảnh!";
            }
            // Tải lên Cloudinary
            Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
            // Lấy URL của ảnh đã tải lên
            return uploadResult.get("url").toString();
        } catch (IOException e) {
            e.printStackTrace();
            return "Tải ảnh thất bại: " + e.getMessage();
        }

    }
}
