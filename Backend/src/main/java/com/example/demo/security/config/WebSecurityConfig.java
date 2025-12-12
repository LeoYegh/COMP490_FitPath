package com.example.demo.security.config;

import com.example.demo.appuser.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final AppUserService appUserService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // enable CORS with our bean below
            .cors(Customizer.withDefaults())
            // disable CSRF for now (good for APIs in dev)
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // allow registration endpoints
                .requestMatchers(HttpMethod.POST, "/api/v1/registration").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/registration/confirm").permitAll()
                // allow everything else while debugging
                .anyRequest().permitAll()
            )
            // no form login / logout from Spring
            .formLogin(form -> form.disable())
            .logout(logout -> logout.disable())
            .httpBasic(Customizer.withDefaults());

        http.authenticationProvider(daoAuthenticationProvider());
        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(appUserService);
        return provider;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(
            // Local dev
            "http://localhost:5173",
            "http://localhost:5000",

            // Your S3 static site
            "http://fitpath-website.s3-website-us-east-1.amazonaws.com",
            "https://fitpath-website.s3-website-us-east-1.amazonaws.com",

            // NEW EB environment URL
            "http://FitPath-backend-env.eba-cbbmpmiu.us-east-1.elasticbeanstalk.com",
            "https://FitPath-backend-env.eba-cbbmpmiu.us-east-1.elasticbeanstalk.com"
        ));

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
