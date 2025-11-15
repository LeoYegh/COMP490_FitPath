/**
 * Title: AppUserService.java
 *
 * Description: Service layer class responsible for managing application users.
 * It implements Spring Security's UserDetailsService to load user-specific data
 * and handles core business logic like user registration (sign up) and account
 * activation.
 *
 * @author Leo Y 
 * @version 1.0
 */
package com.example.demo.appuser;

import com.example.demo.registration.token.ConfirmationToken;
import com.example.demo.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Service class that manages business logic for {@link AppUser} entities.
 * It implements {@link UserDetailsService} to integrate with Spring Security
 * for user authentication.
 */
@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG =
            "user with email %s not found";

    /**
     * Repository for accessing and managing AppUser data in the persistence layer.
     */
    private final UserRepository UserRepository;
    
    /**
     * Encoder used to securely hash and verify user passwords.
     */
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    
    /**
     * Service for managing and saving confirmation tokens during registration.
     */
    private final ConfirmationTokenService confirmationTokenService;

    /**
     * Locates the user based on the email address. This method is required by
     * the {@link UserDetailsService} interface and is used by Spring Security
     * during the authentication process.
     *
     * @param email The email (username) identifying the user whose data is required.
     * @return A fully populated user record (an {@link AppUser} instance).
     * @throws UsernameNotFoundException if the user with the given email is not found.
     */
    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        return UserRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                String.format(USER_NOT_FOUND_MSG, email)));
    }

    /**
     * Handles the user registration process.
     * <p>
     * This method checks if the user already exists, encodes the password, saves
     * the new user to the database, generates a unique confirmation token, and
     * persists the token.
     * </p>
     *
     * @param appUser The {@link AppUser} object containing the new user's details.
     * @return The generated confirmation token string.
     * @throws IllegalStateException if a user with the provided email already exists.
     */
    public String signUpUser(AppUser appUser) {
        boolean userExists = UserRepository
                .findByEmail(appUser.getEmail())
                .isPresent();

        if (userExists) {
            // TODO check of attributes are the same and
            // TODO if email not confirmed send confirmation email.

            throw new IllegalStateException("email already taken");
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(appUser.getPassword());

        appUser.setPassword(encodedPassword);

        UserRepository.save(appUser);

        // Generate and save confirmation token
        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15), // Token expires in 15 minutes
                appUser
        );

        confirmationTokenService.saveConfirmationToken(
                confirmationToken);

//        TODO: SEND EMAIL

        return token;
    }

    /**
     * Activates a user account by setting the {@code enabled} status to {@code true}.
     * This method is typically called after the user successfully confirms their email
     * via the confirmation token.
     *
     * @param email The email of the user to enable.
     * @return The number of records updated (should be 1 upon success).
     */
    public int enableAppUser(String email) {
        return UserRepository.enableAppUser(email);
    }
}