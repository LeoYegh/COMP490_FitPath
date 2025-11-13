package com.example.demo.calorie;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.appuser.AppUser;

public interface CalorieLogRepository extends JpaRepository<CalorieLog, Long>{

    List<CalorieLog> findByUser(AppUser user);
    
    List<CalorieLog> findByUserId(Long userId);

    List<CalorieLog> findByUserIdAndLogDate(Long userId, LocalDate logDate);

}
