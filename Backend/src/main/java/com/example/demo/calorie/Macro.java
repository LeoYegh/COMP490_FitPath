/**
 * Title: Macro.java
 *
 * Description: Simple data class used to hold the three primary macronutrient
 * values: protein, carbohydrates, and fat, with default values of zero.
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.calorie;

/**
 * A simple object  representing the breakdown of macronutrients
 * (macros) in grams.
 * <p>
 * This class is intended to store the core macro data for a food item or log entry.
 * </p>
 */
public class Macro {
    /**
     * The amount of protein in grams, defaulting to 0.
     */
    int protein = 0;
    
    /**
     * The amount of carbohydrates (carbs) in grams, defaulting to 0.
     */
    int carbs = 0;
    
    /**
     * The amount of fat in grams, defaulting to 0.
     */
    int fat = 0;
}