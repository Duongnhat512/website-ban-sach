FROM openjdk:17-jdk-alpine
WORKDIR /app

COPY target/api-gateway-0.0.1-SNAPSHOT.jar app.jar

# Kích hoạt cấu hình application-docker.yml
ENV SPRING_PROFILES_ACTIVE=docker

EXPOSE 8888
ENTRYPOINT ["java", "-jar", "app.jar"]
