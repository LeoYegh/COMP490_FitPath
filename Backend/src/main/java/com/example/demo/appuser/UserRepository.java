/**
 * Title: UserRepository.java
 *
 * Description: Spring Data JPA Repository interface for managing AppUser entities.
 * This interface extends JpaRepository to inherit standard CRUD operations and
 * defines custom query methods for finding and enabling users based on their email.

 * @author Leo Y 
 * @version 1.0
 */
package com.example.demo.appuser;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Repository interface for {@link AppUser} entities.
 * <p>
 * It extends {@link JpaRepository} to provide standard database operations
 * and defines custom methods for specific user lookup and update operations.
 * </p>
 * This repository is set to be read-only by default for performance and safety.
 */
@Repository

public interface UserRepository extends JpaRepository<AppUser, Long> {

    /**
     * Finds a user by their unique email address.
     *
     * @param email The email address of the user to find.
     * @return An {@link Optional} containing the {@link AppUser} if found, or an
     *         empty Optional otherwise.
     */
    Optional<AppUser> findByEmail(String email);

    /**
     * Updates the {@code enabled} status of an {@link AppUser} to {@code TRUE}
     * based on their email.
     * <p>
     * This method is transactional and uses a custom JPQL query to perform the
     * update.
     * {@code @Modifying} is required to execute a modifying query like UPDATE or
     * DELETE.
     * </p>
     *
     * @param email The email of the user to enable.
     * @return The number of entities updated (should be 1 if the user exists).
     */
    @Transactional
    @Modifying
    @Query("UPDATE AppUser a " +
            "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);
}