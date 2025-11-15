/**
 * Title: EmailSender.java
 *
 * Description: Interface defining how sending emails works within the application.
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.email;

/**
 * Interface defining the functionality for sending emails,
 * for sending a plain text or HTML email to a specified recipient.
 */
public interface EmailSender {
    /**
     * Sends an email to a specified recipient with the given email content.
     *
     * @param to The email address of the recipient.
     * @param email The content (body) of the email, typically in HTML format.
     */
    void send(String to, String email);
}