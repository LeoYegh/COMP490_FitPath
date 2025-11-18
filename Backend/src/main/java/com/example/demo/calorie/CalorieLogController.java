package com.example.demo.calorie;

import com.example.demo.appuser.AppUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/calorie")
public class CalorieLogController {

    private final CalorieLogService calorieLogService;

    public CalorieLogController(CalorieLogService calorieLogService) {
        this.calorieLogService = calorieLogService;
    }

    @PostMapping(path = "/me")
    public CalorieLog calorieLogForUser(
            @AuthenticationPrincipal AppUser currentUser,
            @RequestParam Integer calories,
            @RequestParam Integer protein,
            @RequestParam Integer fat,
            @RequestParam Integer carbs,
            @RequestParam String mealType,
            @RequestParam(required = false) String date
    ) {
        LocalDate logDate = (date != null) ? LocalDate.parse(date) : LocalDate.now();

        return calorieLogService.calorieLoggerUser(
                currentUser,
                logDate,
                mealType,
                calories,
                protein,
                fat,
                carbs
        );
    }
}
