package com.example.demo.calorie;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.appuser.AppUser;

@Service
@Transactional
public class CalorieLogService {

    private final CalorieLogRepository calorieLogRepository;

    public CalorieLogService(CalorieLogRepository calorieLogRepository) {
        this.calorieLogRepository = calorieLogRepository;
    }

    public CalorieLog calorieLoggerUser(
            AppUser user,
            LocalDate logDate,
            String mealType,
            int calories,
            int protein,
            int fat,
            int carbs
    ) {
        CalorieLog log = new CalorieLog();   
        log.setUser(user);
        log.setLogDate(logDate != null ? logDate : LocalDate.now());
        log.setMealType(mealType);
        log.setCalories(calories);
        log.setProtein(protein);
        log.setFat(fat);
        log.setCarbs(carbs);

        return calorieLogRepository.save(log);
    }
}
