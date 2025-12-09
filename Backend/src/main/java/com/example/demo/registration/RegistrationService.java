/**
 * Title: RegistrationService.java
 *
 * Description: Service layer class responsible for managing the entire user registration
 * and email confirmation workflow, integrating validation, user creation, token management,
 * and email dispatch.
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.registration;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRole;
import com.example.demo.appuser.AppUserService;
import com.example.demo.email.EmailSender;
import com.example.demo.registration.token.ConfirmationToken;
import com.example.demo.registration.token.ConfirmationTokenService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

/**
 * Service class that handles the user registration process.
 * It handles input validation, user account creation, generating and persisting
 * confirmation tokens, and sending the verification email.
 */
@Service
@RequiredArgsConstructor
public class RegistrationService {

    /**
     * Component used to validate the email format.
     */
    private final EmailValidator emailValidator;
    
    /**
     * Service used to manage persistence and retrieval of confirmation tokens.
     */
    private final ConfirmationTokenService confirmationTokenService;
    
    /**
     * Service used for business logic related to AppUser entities, including sign-up and enabling.
     */
    private final AppUserService appUserService;
    
    /**
     * Service used to dispatch the confirmation email.
     */
    private final EmailSender emailSender;

    /**
     * Processes a new user registration request.
     * <p>
     * 1. Validates the email format.
     * 2. Creates and saves the new {@link AppUser} with a default role (USER).
     * 3. Generates a unique confirmation token.
     * 4. Sends a confirmation email to the user.
     * </p>
     *
     * @param request The {@link RegistrationRequest} DTO containing user details.
     * @return The unique confirmation token string.
     * @throws IllegalStateException if the email format is invalid.
     */
    public String register(RegistrationRequest request) {
        if (!emailValidator.test(request.getEmail())) {
            throw new IllegalStateException("Invalid email");
        }

        String token = appUserService.signUpUser(new AppUser(
                request.getFirstName(), 
                request.getLastName(), 
                request.getEmail(),
                request.getPassword(),
                AppUserRole.USER
            )
        );

        String link = "http://localhost:5000/api/v1/registration/confirm?token=" + token;
        emailSender.send(
            request.getEmail(), buildEmail(request.getFirstName(), link));
        return token;
    }

    /**
     * Confirms the account registration using a valid token.
     * <p>
     * 1. Retrieves the  ConfirmationToken.
     * 2. Checks if the token is already confirmed or expired.
     * 3. If valid, updates the token's confirmedAt timestamp.
     * 4. Enables the associated AppUser account.
     * </p>
     *
     * @param token The confirmation token string provided by the user.
     * @return A string literal "confirmed" upon successful account activation.
     * @throws IllegalStateException if the token is not found, already confirmed, or expired.
     */
    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        appUserService.enableAppUser(
                confirmationToken.getAppUser().getEmail());
        return "confirmed";
    }

    /**
     * Utility method to generate the HTML content for the account confirmation email. its already just hard coded in info 
     *
     * @param name The first name of the user to personalize the email.
     * @param link The full URL link containing the confirmation token.
     * @return A string containing the HTML body of the confirmation email.
     */
    private String buildEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "    </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 15 minutes. <p>See you soon</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }

}