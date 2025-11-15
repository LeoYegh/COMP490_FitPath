/**
 * Title: ConfirmationTokenService.java
 *
 * Description: Service layer class responsible for managing the business logic
 * related to ConfirmationToken entities, including saving new tokens, retrieving
 * tokens by value, and updating their confirmation timestamps.
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.registration.token;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

/**
 * Service class that handles the core business logic for ConfirmationToken operations.
 * It acts as an intermediary between the business layer and the ConfirmationTokenRepository.
 */
@Service
@AllArgsConstructor
public class ConfirmationTokenService {

    /**
     * Repository for accessing and managing ConfirmationToken data in the persistence layer.
     */
    private final ConfirmationTokenRepository confirmationTokenRepository;

    /**
     * Saves a new confirmation token to the database.
     *
     * @param token The ConfirmationToken entity to be saved.
     */
    public void saveConfirmationToken(ConfirmationToken token) {
        confirmationTokenRepository.save(token);
    }

    /**
     * Retrieves a confirmation token by its unique token string.
     *
     * @param token The unique token string to search for.
     * @return A optional (so its optional) containing the ConfirmationToken if found.
     */
    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }
    
    /**
     * Updates the  confirmedAt timestamp for a specific token to the current time.
     * This method is called upon confirmation of a user's email.
     *
     * @param token The token string of the record to update.
     * @return The number of records updated (should be 1 when done successfully).
     */
    public int setConfirmedAt(String token) {
        return confirmationTokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }

}