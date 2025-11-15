/**
 * Title: CalorieLog.java
 *
 * Description: JPA Entity representing a single log entry for calorie and macronutrient
 * consumption, associated with a specific user and date.
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.calorie;

import java.time.LocalDate;
import com.example.demo.appuser.AppUser;
import jakarta.persistence.*;

/**
 * Represents a single log entry in a user's calorie diary.
 * This entity tracks the calories and macronutrients consumed for a particular meal
 * on a specific date and is linked to an {@link AppUser}.
 */
@Entity
@Table(name = "calorie_log")
public class CalorieLog {

    /**
     * The unique identifier (primary key) for the calorie log entry.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /**
     * The {@link AppUser} who created this log entry.
     * This defines a Many-to-One relationship, is fetched lazily, and is a required field.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;
    
    /**
     * The date on which the food was consumed.
     */
    private LocalDate logDate;
    
    /**
     * The type of meal logged (e.g., "Breakfast", "Lunch", "Snack").
     */
    private String mealType;
    
    /**
     * The total caloric count for this entry.
     */
    private int calories;
    
    /**
     * The amount of protein in grams.
     */
    private int protein;
    
    /**
     * The amount of fat in grams.
     */
    private int fat;
    
    /**
     * The amount of carbohydrates in grams.
     */
    private int carbs;

    /**
     * Retrieves the user associated with this calorie log.
     *
     * @return The associated {@link AppUser}.
     */
    public AppUser getUser() {
        return user;
    }
    
    /**
     * Sets the user associated with this calorie log.
     *
     * @param user The {@link AppUser} to set.
     */
    public void setUser(AppUser user) {
        this.user = user;
    }
    
    /**
     * Retrieves the date of this log entry.
     *
     * @return The log date.
     */
    public LocalDate getLogDate() {
        return logDate;
    }
    
    /**
     * Sets the date of this log entry.
     *
     * @param logDate The log date to set.
     */
    public void setLogDate(LocalDate logDate) {
        this.logDate = logDate;
    }
    
    /**
     * Retrieves the type of meal logged.
     *
     * @return The meal type string.
     */
    public String getMealType() {
        return mealType;
    }
    
    /**
     * Sets the type of meal logged.
     *
     * @param mealType The meal type string to set.
     */
    public void setMealType(String mealType) {
        this.mealType = mealType;
    }
    
    /**
     * Retrieves the total caloric count.
     *
     * @return The calorie count.
     */
    public int getCalories() {
        return calories;
    }
    
    /**
     * Sets the total caloric count.
     *
     * @param calories The calorie count to set.
     */
    public void setCalories(int calories) {
        this.calories = calories;
    }
    
    /**
     * Retrieves the amount of protein in grams.
     *
     * @return The protein amount.
     */
    public int getProtein() {
        return protein;
    }
    
    /**
     * Sets the amount of protein in grams.
     *
     * @param protein The protein amount to set.
     */
    public void setProtein(int protein) {
        this.protein = protein;
    }
    
    /**
     * Retrieves the amount of fat in grams.
     *
     * @return The fat amount.
     */
    public int getFat() {
        return fat;
    }
    
    /**
     * Sets the amount of fat in grams.
     *
     * @param fat The fat amount to set.
     */
    public void setFat(int fat) {
        this.fat = fat;
    }
    
    /**
     * Retrieves the amount of carbohydrates in grams.
     *
     * @return The carbohydrate amount.
     */
    public int getCarbs() {
        return carbs;
    }
    
    /**
     * Sets the amount of carbohydrates in grams.
     *
     * @param carbs The carbohydrate amount to set.
     */
    public void setCarbs(int carbs) {
        this.carbs = carbs;
    }
}