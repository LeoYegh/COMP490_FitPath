/**
 * Title: ConfirmationToken.java
 *
 * Description: JPA Entity representing a unique, time-limited token used for
 * email verification or account confirmation during user registration. In easy to 
 * understand english this is responsible for the "you have 10 minutes to verify" email
 * stuff 
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.registration.token;

import java.time.LocalDateTime;

import com.example.demo.appuser.AppUser;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * JPA Entity representing a confirmation token.
 * This token is created upon user registration and sent via email to verify
 * the user's account before it can be enabled.
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
public class ConfirmationToken {

    /**
     * Generator definition for the sequence used to generate primary key IDs.
     */
    @SequenceGenerator(name = "confirmation_token_sequence", sequenceName = "confirmation_token_sequence", allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "confirmation_token_sequence")
    private Long id;

    /**
     * The unique token string used for confirmation. Cannot be null.
     */
    @Column(nullable = false)
    private String token;

    /**
     * The date and time when the token was created. Cannot be null.
     */
    @Column(nullable = false)
    private LocalDateTime createdAt;

    /**
     * The date and time when the token expires. Cannot be null.
     */
    @Column(nullable = false)
    private LocalDateTime expiresAt;

    /**
     * The date and time when the token was successfully used to confirm the
     * account.
     * This field is null until confirmation occurs.
     */
    private LocalDateTime confirmedAt;

    /**
     * The AppUser associated with this token.
     * Defines a Many-to-One relationship and is a required field.
     */
    @ManyToOne
    @JoinColumn(nullable = false, name = "app_user_id")
    private AppUser appUser;

    /**
     * Constructs a new ConfirmationToken instance.
     * The time is initially set to {@code null}.
     *
     * @param token     The unique token string.
     * @param createdAt The token creation time.
     * @param expiresAt The token expiration time.
     * @param appUser   The user associated with this token.
     */
    public ConfirmationToken(String token,
            LocalDateTime createdAt,
            LocalDateTime expiresAt,
            AppUser appUser) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.appUser = appUser; // 👈 THIS was missing
    }
}