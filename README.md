# Website Bán Sách

## Giới thiệu
Dự án **Website Bán Sách** là một hệ thống thương mại điện tử cho phép người dùng mua sách trực tuyến. Hệ thống hỗ trợ các tính năng như đăng ký, đăng nhập, đặt hàng, quản lý giỏ hàng, thanh toán và đánh giá sản phẩm.

## Cấu trúc thư mục
```
├── docker-compose.yaml   # Cấu hình Docker cho toàn bộ hệ thống
├── AuthenticationService/ # Dịch vụ xác thực
├── Comment-Service/      # Dịch vụ bình luận
├── NotificationService/  # Dịch vụ thông báo
├── api-gateway/         # API Gateway cho hệ thống
├── book-service/        # Dịch vụ quản lý sách
├── cart-service/        # Dịch vụ giỏ hàng
├── order-service/       # Dịch vụ đặt hàng
├── orderDetail-service/ # Dịch vụ chi tiết đơn hàng
├── payment-service/     # Dịch vụ thanh toán
├── promotion-service/   # Dịch vụ khuyến mãi
├── server-config/       # Dịch vụ cấu hình máy chủ
└── service-register/    # Dịch vụ đăng ký dịch vụ
```

## Công nghệ sử dụng
- **Backend:** Spring Boot (Microservices), Spring Security, Spring Cloud Gateway
- **Database:** PostgreSQL, Redis
- **Frontend:** Chưa có thông tin (có thể là React, Angular,...)
- **Message Queue:** Apache Kafka
- **Authentication:** OAuth2, JWT
- **Containerization:** Docker, Docker Compose

## Cài đặt
### Yêu cầu hệ thống
- JDK 17 trở lên
- Docker & Docker Compose
- PostgreSQL, Redis, Kafka

### Hướng dẫn khởi chạy
1. Clone repository:
   ```bash
   git clone https://github.com/yourusername/bookstore-microservices.git
   cd bookstore-microservices
   ```
2. Khởi chạy hệ thống bằng Docker Compose:
   ```bash
   docker-compose up -d
   ```
3. Kiểm tra các dịch vụ đang chạy:
   ```bash
   docker ps
   ```

## Tính năng chính
- **Đăng ký, đăng nhập, xác thực người dùng**
- **Quản lý sách, danh mục sách**
- **Thêm sách vào giỏ hàng, đặt hàng, thanh toán**
- **Đánh giá và bình luận sách**
- **Quản lý khuyến mãi và thông báo**

## Đóng góp
Vui lòng mở issue hoặc tạo pull request để đóng góp vào dự án.

## Giấy phép
Dự án này được phát hành theo giấy phép MIT.


