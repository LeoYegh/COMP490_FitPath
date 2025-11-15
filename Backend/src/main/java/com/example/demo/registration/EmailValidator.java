/**
 * Title: EmailValidator.java
 *
 * Description: Service component that validates email addresses against a
 * predefined regular expression pattern. It implements the standard Java
 * Predicate interface.
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.registration;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;
import java.util.regex.Pattern;

/**
 * Service class that implements the Predicate interface to validate the
 * format of an email address.
 * <p>
 * This validator uses a regular expression to check if the input string
 * adheres to a basic, common email format structure.
 * </p>
 */
@Service
public class EmailValidator implements Predicate<String> {

    /**
     * A regular expression pattern used to validate the basic structure of an email address.
     * The pattern used here is: {@code ^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$}. (we dont understand this well)
     */
    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

    /**
     * Tests whether the given email string is valid according to the predefined
     * regular expression pattern.
     *
     * @param email The email string to validate.
     * @return if the email is not null and matches the email pattern; false otherwise.
     */
    @Override
    public boolean test(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }
}