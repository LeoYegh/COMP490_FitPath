package com.example.demo.calorie;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.UserRepository;

@Service
@Transactional
public class CalorieLogService {

    private final CalorieLogRepository calorieLogRepository;
    private final UserRepository userRepository;

    public CalorieLogService(CalorieLogRepository calorieLogRepository,
            UserRepository userRepository) {
        this.calorieLogRepository = calorieLogRepository;
        this.userRepository = userRepository;
    }

    public CalorieLog calorieLoggerUser(
            String email,
            LocalDate logDate,
            String mealType,
            int calories,
            int protein,
            int fat,
            int carbs) {

        // TEMP: fetching user by ID (replace later with email-based lookup)
        AppUser user = userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("User not found with ID: 1"));

        // Create new log
        CalorieLog log = new CalorieLog();

        // Link user
        log.setUser(user);

        // Set fields
        log.setLogDate(logDate != null ? logDate : LocalDate.now());
        log.setMealType(mealType);
        log.setCalories(calories);
        log.setProtein(protein);
        log.setFat(fat);
        log.setCarbs(carbs);

        // Save and return
        return calorieLogRepository.save(log);
    }
}