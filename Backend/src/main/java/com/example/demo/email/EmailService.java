/**
 * Title: EmailService.java
 *
 * Description: Service implementation for sending emails asynchronously using Spring's
 * JavaMailSender. This class handles the actual communication with the SMTP server.
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.email;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

/**
 * Concrete implementation of the {@link EmailSender} interface, utilizing
 * Spring Boot's {@link JavaMailSender} to dispatch emails.
 */
@Service
@AllArgsConstructor
public class EmailService implements EmailSender {

    private final static Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    /**
     * The Spring component responsible for configuring and sending emails.
     */
    private final JavaMailSender mailSender;

    /**
     * Sends an email asynchronously to a specified recipient with the given HTML content.
     * <p>
     * The subject is hardcoded to "Confirm your email" and the sender is hardcoded
     * to "leoyegh@gmail.com". The email content is treated as HTML.
     * </p>
     *
     * @param to The email address of the recipient.
     * @param email The content (body) of the email, usually HTML.
     * @throws IllegalStateException if a {@link MessagingException} occurs during the email sending process.
     */
    @Override
    @Async
    public void send(String to, String email) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(email, true); // true indicates the email is HTML
            helper.setTo(to);
            helper.setSubject("Confirm your email");
            helper.setFrom("leoyegh@gmail.com");
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            LOGGER.error("failed to send email", e);
            throw new IllegalStateException("failed to send email");
        }
    }

}