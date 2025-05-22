# Sử dụng image Java chính thức
FROM openjdk:17-jdk-alpine
# Đặt thư mục làm việc trong container
WORKDIR /app
# Sao chép file jar vào container
COPY target/book-service-0.0.1-SNAPSHOT.jar app.jar
# Kích hoạt cấu hình application-docker.yml
ENV SPRING_PROFILES_ACTIVE=docker
# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]