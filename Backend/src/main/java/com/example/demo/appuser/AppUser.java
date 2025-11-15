package com.example.demo.appuser;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * Represents a user entity in the application, implementing Spring Security's
 * {@link UserDetails} interface.
 * <p>
 * This class maps to the 'app_user' table in the database and provides the
 * core user information required for authentication and authorization.
 * </p>
 */
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class AppUser implements UserDetails {

    /**
     * The unique identifier (primary key) for the user.
     * The strategy is set to IDENTITY, allowing the database to generate the value.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The first name of the user.
     */
    private String firstName;
    
    /**
     * The last name of the user.
     */
    private String lastName;

    /**
     * The email address of the user.
     * This column is required (non-nullable) and must be unique, serving as the
     * application's primary username/login identifier.
     */
    @Column(nullable = false, unique = true)
    private String email;

    /**
     * The hashed password of the user.
     */
    private String password;

    /**
     * The role assigned to the user (e.g., USER, ADMIN).
     * The enumeration is stored as a String in the database.
     */
    @Enumerated(EnumType.STRING)
    private AppUserRole appUserRole;

    /**
     * Flag indicating if the user account is locked. Defaults to {@code false}.
     */
    private Boolean locked = false;
    
    /**
     * Flag indicating if the user account is enabled (e.g., confirmed or active). Defaults to {@code false}.
     */
    private Boolean enabled = false;

    /**
     * Constructs a new AppUser with essential details.
     * The {@code locked} and {@code enabled} flags default to {@code false}.
     *
     * @param firstName the user's first name
     * @param lastName the user's last name
     * @param email the user's email, which serves as the username
     * @param password the user's encoded password
     * @param appUserRole the role of the user
     */
    public AppUser(String firstName, String lastName, String email, String password, AppUserRole appUserRole) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.appUserRole = appUserRole;
    }

    /**
     * Retrieves the authorities (roles) granted to the user.
     *
     * <p>By convention in Spring Security, roles are prefixed with "ROLE_".</p>
     *
     * @return a collection containing the user's role as a {@link GrantedAuthority}.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Spring convention: authorities start with "ROLE_"
        return List.of(new SimpleGrantedAuthority("ROLE_" + appUserRole.name()));
    }

    /**
     * Retrieves the password used to authenticate the user.
     *
     * @return the user's encoded password.
     */
    @Override 
    public String getPassword() { 
        return password; 
    }
    
    /**
     * Retrieves the username used to authenticate the user.
     *
     * <p>In this application, the username is the user's email address.</p>
     *
     * @return the user's email address.
     */
    @Override 
    public String getUsername() { 
        return email; 
    }

    /**
     * Indicates whether the user's account has expired.
     *
     * <p>This implementation always returns {@code true}, meaning the account never expires.</p>
     *
     * @return {@code true} if the user's account is valid (i.e., not expired), {@code false} otherwise.
     */
    @Override 
    public boolean isAccountNonExpired() { 
        return true; 
    }
    
    /**
     * Indicates whether the user is locked or unlocked.
     *
     * @return {@code true} if the user is not locked, {@code false} otherwise.
     */
    @Override 
    public boolean isAccountNonLocked() { 
        return !Boolean.TRUE.equals(locked); 
    }
    
    /**
     * Indicates whether the user's credentials (password) have expired.
     *
     * <p>This implementation always returns {@code true}, meaning credentials never expire.</p>
     *
     * @return {@code true} if the user's credentials are valid (i.e., not expired), {@code false} otherwise.
     */
    @Override 
    public boolean isCredentialsNonExpired() { 
        return true; 
    }
    
    /**
     * Indicates whether the user is enabled or disabled.
     *
     * @return {@code true} if the user is enabled, {@code false} otherwise.
     */
    @Override 
    public boolean isEnabled() { 
        return Boolean.TRUE.equals(enabled); 
    }
}