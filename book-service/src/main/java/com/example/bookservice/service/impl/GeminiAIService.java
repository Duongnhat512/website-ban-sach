package com.example.bookservice.service.impl;

import com.example.bookservice.Repository.BookElasticSearchRepository;
import com.example.bookservice.Repository.BookRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GeminiAIService {

    @Autowired
    private BookElasticSearchRepository bookRepository;

    @Value("${google.gemini.apiKey}")
    private String apiKey;
    private final WebClient webClient;
    @Autowired
    private RedisTemplate<String,Object> redisTemplate;

    private static String historyKey = "guest" ; // Key chung trong Redis

    public GeminiAIService(WebClient.Builder webClientBuilder) {
        String apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
        this.webClient = webClientBuilder.baseUrl(apiUrl).build();
    }
    public Mono<String> suggestBook(String customerInterest) {
        return bookRepository.findAll()
                .collectList()
                .flatMap(bookList -> {
                    // Lấy lịch sử hội thoại từ Redis
                    List<String> history = (List<String>) redisTemplate.opsForValue().get(historyKey);
                    if (history == null) {
                        history = new ArrayList<>();
                    }

                    // Chuyển danh sách sách thành chuỗi mô tả
                    String bookData = bookList.stream()
                            .map(book ->
                                    "- Tựa sách: " + book.getTitle()
                                            + " (Mô tả: " + book.getDescription()
                                            + ") - Giá gốc: " + book.getOriginalPrice() + " VND"
                                            + " - Giá giảm: " + book.getCurrentPrice() + " VND"
                                            + " (Giảm " + book.getDiscount() + "%)"
                                            + " - Ngày phát hành: " + book.getReleasedDate()
                                            + " - Nhà xuất bản: " + book.getPublisher()
                                            + " - Số trang: " + book.getPages()
                                            + " - Số lượng còn: " + book.getQuantity() + " quyển"
                                            + " - Hình ảnh: " + book.getThumbnail()
                                            + " - Đường dẫn vào trang chi tiết sách (Không hiển thị ID):  " + String.format("%s", "/product/" + book.getId())
                                            + " - Tác giả: " + book.getAuthor()
                            )
                            .collect(Collectors.joining("\n"));


                    // Thêm câu hỏi mới vào lịch sử
                    history.add("Khách hàng: " + customerInterest);

                    // Tạo prompt với lịch sử hội thoại
                    String prompt = "Lịch sử hội thoại (Không hiển thị):\n" + String.join("\n", history) +
                            "\n\nDanh sách sách:\n" + bookData +
                            "\n\nTôi cần bạn bỏ các câu như gợi ý từ đâu." +
                            "\n\nNếu history <= 2, nên hỏi mong muốn của khách hàng trước khi tư vấn sách phù hợp." +
                            "\n\nBạn hãy gợi ý một cuốn sách phù hợp trong 1-2 câu ngắn gọn.";

                    Map<String, Object> requestBody = Map.of(
                            "contents", new Object[]{
                                    Map.of("parts", new Object[]{
                                            Map.of("text", prompt)
                                    })
                            }
                    );

                    List<String> finalHistory = history;
                    return webClient.post()
                            .uri("?key=" + apiKey)
                            .bodyValue(requestBody)
                            .retrieve()
                            .bodyToMono(String.class)
                            .map(response -> {
                                // Thêm phản hồi vào lịch sử
                                finalHistory.add("AI: " + extractTextFromResponse(response));

                                // Cập nhật lại lịch sử hội thoại trong Redis (lưu tối đa 10 phút)
                                redisTemplate.opsForValue().set(historyKey, finalHistory, Duration.ofMinutes(10));

                                return finalHistory.get(finalHistory.size() - 1); // Trả về câu trả lời mới nhất từ AI
                            })
                            .onErrorReturn("Lỗi khi gọi Gemini API.");
                });
    }

    private String extractTextFromResponse(String jsonResponse) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        } catch (Exception e) {
            return "Lỗi khi xử lý response từ Gemini.";
        }
    }
}
