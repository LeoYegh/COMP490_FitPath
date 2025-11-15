/**
 * Title: CaloriePrompts.java
 *
 * Description: Utility class responsible for handling console input and output
 * to interact with the user for the calorie tracking application.
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.calorie;

import java.io.FileNotFoundException;
import java.util.Scanner;

/**
 * Provides static methods for displaying prompts and reading user input from the console.
 * This class handles the basic command-line interface (CLI) for the application.
 */
public class CaloriePrompts {

    /**
     * Displays the main menu prompt (from {@code CalorieUtil.prompt}) and reads the
     * user's integer selection from the console.
     * <p>
     * Note: This code is just here for testing without turning on the front end 
     * </p>
     *
     * @return The integer value representing the user's selection.
     */
    public static int promptSelector() {
        Scanner keyboard = new Scanner(System.in);
        System.out.println(CalorieUtil.prompt);
        int selection = keyboard.nextInt();
        // The local 'keyboard' scanner created here is not closed.
        return selection;
    }

    /**
     * Prompts the user to enter the date and the name of the food or drink item
     * to be logged.
     * <p
     *
     * @throws FileNotFoundException If file operations were involved and it doesnt find it .
     */
    public static void food() throws FileNotFoundException {
        Scanner keyboard = new Scanner(System.in);

        System.out.println("Please Enter the Date: ");
        int Date = keyboard.nextInt();

        System.out.println("Please Enter the name of the food or drink: ");
        String foodName = keyboard.nextLine();
        
        // The local 'keyboard' scanner created here is not closed eventually need to deal with that 
    }
}