/**
 * Title: ConfirmationTokenRepository.java
 *
 * Description: Spring Data JPA Repository for managing ConfirmationToken entities.
 * It extends JpaRepository for standard CRUD operations and provides custom
 * methods for finding and updating tokens used in the email confirmation process.
 * This uses alot of information from Spring boot so please look to Spring boots docs
 * for more information 
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.registration.token;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

/**
 * Repository interface for entities.
 * This repository is responsible for data access operations related to
 * registration and confirmation tokens.
 */
@Repository
public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {

    /**
     * Finds a confirmation token by its unique token string value.
     *
     * @param token The unique token string.
     * @return A link containing the ConfirmationToken if found, or an empty Optional otherwise.
     */
    Optional<ConfirmationToken> findByToken(String token);

    /**
     * Updates the confirmedAt timestamp for a token once it has been successfully used
     * to confirm a user's account.
     * This operation requires the Transactional and the Modifying annotations
     * as it performs a data manipulation language (DML) update using a custom JPQL query.
     * (learn more about this on Spring boot we don't know about it really)
     * 
     *
     * @param token The token string to identify the record to update.
     * @param confirmedAt The LocalDateTime value to set for the confirmed time.
     * @return The number of entities updated (should be 1 if done correctly).
     */
    @Transactional
    @Modifying
    @Query("UPDATE ConfirmationToken c " +
            "SET c.confirmedAt = ?2 " +
            "WHERE c.token = ?1")
    int updateConfirmedAt(String token,
                          LocalDateTime confirmedAt);
}