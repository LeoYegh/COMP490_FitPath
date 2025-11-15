/**
 * Title: CalorieUtil.java
 *
 * Description: Utility class providing global resources and constants for the
 * calorie tracking application, such as the shared scanner for console input
 * and the main menu prompt string. It is used so we dont need to always turn on
 * the front end to test the database 
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.calorie;

import java.util.Scanner;

/**
 * Utility class containing shared resources and constants used across the calorie package.
 * It primarily holds a static, global {@link Scanner} object for console input
 * and the main menu prompt message.
 */
public class CalorieUtil {
    
    /**
     * A global, static {@link Scanner} object used to read input from the console (System.in).
     * This resource must be closed when the application exits to prevent resource leaks.
     */
    public static final Scanner keyboard = new Scanner(System.in);
    
    /**
     * The constant string containing the main menu prompt displayed to the user
     * at the start of the application.
     */
    public static final String prompt = "Welcome to the FitPath Calorie Tracker!\n" + 
            "Please Make a Selection\n" + 
            "1 - Enter new data\n" + 
            "2 - See logged data\n" + 
            "8 - Quit program\n" +
            "Please enter a selection: ";
}
