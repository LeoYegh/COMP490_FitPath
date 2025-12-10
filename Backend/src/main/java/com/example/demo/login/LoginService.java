package com.example.demo.login;

import com.example.demo.appuser.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final AppUserService appUserService;
    private final BCryptPasswordEncoder passwordEncoder;

    public boolean login(LoginRequest request) {
        // Load user from DB
        UserDetails user = appUserService.loadUserByUsername(request.getEmail());

        // Compare raw password with hashed password
        return passwordEncoder.matches(request.getPassword(), user.getPassword());
    }
}