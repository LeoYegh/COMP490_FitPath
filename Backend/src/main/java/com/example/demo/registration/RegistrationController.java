/**
 * Title: RegistrationController.java
 *
 * Description: REST controller handling HTTP requests related to user registration and
 * email confirmation for the application.
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.registration;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller that exposes endpoints for user registration and email
 * confirmation.
 * 
 */
@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class RegistrationController {

    /**
     * The service layer component handling the business logic for registration
     * processes.
     */
    private final RegistrationService registrationService;

    /**
     * Handles new user registration requests.
     * <p>
     * This endpoint accepts a JSON payload containing user details and delegates
     * the registration logic (including password encoding and token creation) to
     * the service.
     * </p>
     *
     * @param request The RegistrationRequest body containing user details (name,
     *                email, password).
     * @return A string representing the result of the registration process,
     *         typically the confirmation token.
     */
    @PostMapping
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

    /**
     * Confirms a user's account using a unique confirmation token.
     * using a link sent to the users email
     *
     * @param token The confirmation token passed as a request parameter.
     * @return A string indicating the result of the confirmation (success message).
     */
    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }

}