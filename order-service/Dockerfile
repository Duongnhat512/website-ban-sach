# Sử dụng image Java chính thức
FROM openjdk:17-jdk-alpine

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép file jar vào container
COPY target/order-service-0.0.1-SNAPSHOT.jar app.jar
ENV SPRING_PROFILES_ACTIVE=docker

# Expose port ứng dụng (thay đổi nếu cần)
EXPOSE 8082

# Lệnh chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]