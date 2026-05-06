package com.example.demo.Workout;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "workout_log")
public class WorkoutLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * User ID associated with the workout
     */
    private int userId;

    /**
     * Date of the workout
     */
    private LocalDate workoutDate;

    /**
     * Type of workout
     * Example: "Running", "Chest", "Basketball"
     */
    private String workoutType;

    /**
     * Duration of workout in minutes
     */
    private int durationMinutes;

    public WorkoutLog() {}

    public Long getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public LocalDate getWorkoutDate() {
        return workoutDate;
    }

    public void setWorkoutDate(LocalDate workoutDate) {
        this.workoutDate = workoutDate;
    }

    public String getWorkoutType() {
        return workoutType;
    }

    public void setWorkoutType(String workoutType) {
        this.workoutType = workoutType;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }
}