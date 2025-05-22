FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY target/Comment-Service-0.0.1-SNAPSHOT.jar app.jar
ENV SPRING_PROFILES_ACTIVE=docker
EXPOSE 8085
ENTRYPOINT ["java", "-jar", "app.jar"]