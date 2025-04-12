package org.example.fileservice.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = Map.of(
                "cloud_name", "dxkr1bbdp",
                "api_key", "969818675411756",
                "api_secret", "myZphrJdZ4j7b8r29f1-8JoEkek");
        return new Cloudinary(config);
    }

}
