package com.example.demo.calorie;

import java.io.FileNotFoundException;
import java.util.Scanner;

public class CaloriePrompts {


    public static int promptSelector() {
        Scanner keyboard = new Scanner(System.in);
        System.out.println(CalorieUtil.prompt);
        int selection = keyboard.nextInt();
        return selection;
    }

    public static void food() throws FileNotFoundException {
        Scanner keyboard = new Scanner(System.in);

        System.out.println("Please Enter the Date: ");
        int Date = keyboard.nextInt();

        System.out.println("Please Enter the name of the food or drink: ");
        String foodName = keyboard.nextLine();
    }
}
