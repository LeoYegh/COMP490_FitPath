/**
 * Title: App.java
 *
 * Description: The main entry point for the calorie tracking application.
 * It initializes the application flow by calling the prompt selector and
 * ensures the input resources are properly closed upon exit.
 *
 * @author Leo Y 
 * @version 1.0
 */
package com.example.demo.calorie;

/**
 * The main application class for the calorie tracker.
 * This class contains the standard {@code main} method to start the program.
 */
public class App {
    
    /**
     * The main method that executes when the program starts.
     * It initiates the user interface/prompt selector and closes the global
     * keyboard input resource.
     *
     * @param args Command line arguments (not used).
     * @throws Exception if an error occurs during the prompt execution or resource closing.
     */
    public static void main(String[] args) throws Exception {
        CaloriePrompts.promptSelector();
        CalorieUtil.keyboard.close();
    }
}