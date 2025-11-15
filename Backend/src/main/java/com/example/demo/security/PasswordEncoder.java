/**
 * Title: PasswordEncoder.java
 *
 * Description: Configuration class responsible for providing a BCryptPasswordEncoder
 * to the Spring application context for use in password hashing and verification.
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Configuration class that sets up necessary security beans for the application.
 * Specifically, it configures and provides a BCryptPasswordEncoder instance
 * for use throughout the application's security context.
 */
@Configuration
public class PasswordEncoder {
    
    /**
     * Creates and gives a BCryptPasswordEncoder to the Spring application context.
     * <p>
     * This encoder is required for securely hashing user passwords before storing them
     * and for verifying passwords during the authentication process.
     * </p>
     *
     * @return A new instance of  BCryptPasswordEncoder.
     */
    @Bean 
    public BCryptPasswordEncoder bCryptPasswordEncoder() { 
        return new BCryptPasswordEncoder(); 
    }
}