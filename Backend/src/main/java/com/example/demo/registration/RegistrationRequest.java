/**
 * Title: RegistrationRequest.java
 *
 * Description: Data Transfer Object used to carry user registration details
 * from the client to the registration service.
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.registration;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

/**
 * A final class acting as a Data Transfer Object for handling incoming
 * user registration data (sign-up requests).
 * <p>
 * This class uses Lombok annotations to automatically generate getters,
 * an all-args constructor using the , equals(), hashCode() and toString() methods.
 * </p>
 */
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {
    /**
     * The first name of the user.
     */
    private final String firstName;
    
    /**
     * The last name of the user.
     */
    private final String lastName;
    
    /**
     * The email address of the user, which serves as the username.
     */
    private final String email;
    
    /**
     * The plain-text password provided by the user. This will be encoded by the service layer.
     */
    private final String password;
}