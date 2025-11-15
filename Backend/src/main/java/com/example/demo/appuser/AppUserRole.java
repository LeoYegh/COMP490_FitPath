/**
 * Title: AppUserRole.java
 *
 * Description: Defines the enumeration for user roles (authorities) used by
 * the application, corresponding to Spring Security roles.
 *
 * @author Leo Y 
 * @version 1.0
 */
package com.example.demo.appuser;

/**
 * Enumeration representing the predefined roles (authorities) a user can have
 * within the application. These roles are essential for
 * authorization checks by Spring Security
 */
public enum AppUserRole {
    /**
     * Standard user role with basic access privileges.
     */
    USER,
    
    /**
     * Administrative user role with full access and management privileges.
     */
    ADMIN;

    /**
     * Eventualy will return first name right now just has holder 
     *
     * @return Always returns {@code null}.
     */
    public String firstName() {
        return null;
    }
}