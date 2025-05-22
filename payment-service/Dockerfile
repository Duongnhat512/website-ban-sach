FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY target/payment-service-0.0.1-SNAPSHOT.jar app.jar
ENV SPRING_PROFILES_ACTIVE=docker
EXPOSE 8087
ENTRYPOINT ["java", "-jar", "app.jar"]