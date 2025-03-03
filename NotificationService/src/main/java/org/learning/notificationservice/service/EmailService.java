package org.learning.notificationservice.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.learning.event.NotificationEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailService {
    JavaMailSender javaMailSender;
    SpringTemplateEngine templateEngine;
    @NonFinal
    @Value("${spring.mail.username}")
    String emailFrom;
    @KafkaListener(topics = "notification-otp",groupId = "my-consumer-group")
    public void sendOtp(NotificationEvent event) throws MessagingException, UnsupportedEncodingException {
        log.info("Received event: {}", event);
        Context context = new Context();
        context.setVariable("recipientName" , event.getRecipient());

        if(event.getParam() != null){
            context.setVariables(event.getParam());
        }else {
            log.warn("Event param is null, cannot set variables in email template.");
        }
        MimeMessage message  = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

        helper.setFrom(emailFrom, "VO VAN NGHIA HIEP");
        helper.setTo(event.getRecipient());
        helper.setSubject(event.getSubject());
        helper.setText(event.getTemplateCode(), true);
        javaMailSender.send(message);
        log.info("Email sent to: {}", event.getRecipient());

    }
    @KafkaListener(topics = "notification-delivery",groupId = "my-consumer-group")
    public void sendEmailByKafka(NotificationEvent event) throws MessagingException, UnsupportedEncodingException {
        log.info("Received event: {}", event);
        Context context = new Context();
        context.setVariable("recipientName" , event.getRecipient());

        if(event.getParam() != null){
            context.setVariables(event.getParam());
        }else {
            log.warn("Event param is null, cannot set variables in email template.");
        }

        String htmlContent = templateEngine.process(event.getTemplateCode(),context);

        MimeMessage message  = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

        helper.setFrom(emailFrom, "VO VAN NGHIA HIEP");
        helper.setTo(event.getRecipient());
        helper.setSubject(event.getSubject());
        helper.setText(htmlContent, true);

        javaMailSender.send(message);

        log.info("Email sent to: {}", event.getRecipient());

    }

}
