package com.example.demo.registration;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRole;
import com.example.demo.appuser.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistrationService {


    private final EmailValidator emailValidator;

 
    private final AppUserService appUserService;

    public String register(RegistrationRequest request) {
        if (!emailValidator.test(request.getEmail())) {
            throw new IllegalStateException("Invalid email");
        }

        AppUser user = new AppUser(
                request.getFirstName(),  
                request.getLastName(),    
                request.getEmail(),
                request.getPassword(),
                AppUserRole.USER
        );

        return appUserService.signUpUser(user);
    }
}
