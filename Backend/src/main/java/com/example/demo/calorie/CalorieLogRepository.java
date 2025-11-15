/**
 * Title: CalorieLogRepository.java
 *
 * Description: Spring Data JPA Repository for managing CalorieLog entities.
 * It provides standard CRUD operations and custom query methods for retrieving
 * logs based on user and date.
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.calorie;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.appuser.AppUser;

/**
 * Repository interface for {@link CalorieLog} entities.
 * <p>
 * This interface extends {@link JpaRepository} and defines custom finder methods
 * to query calorie log data, primarily focusing on retrieving entries related to a specific user.
 * </p>
 */
public interface CalorieLogRepository extends JpaRepository<CalorieLog, Long>{

    /**
     * Retrieves a list of all {@link CalorieLog} entries associated with the specified {@link AppUser}.
     *
     * @param user The {@link AppUser} whose logs are to be fetched.
     * @return A list of {@code CalorieLog} entries for the user.
     */
    List<CalorieLog> findByUser(AppUser user);
    
    /**
     * Retrieves a list of all {@link CalorieLog} entries associated with the specified user ID.
     *
     * @param userId The ID of the user whose logs are to be fetched.
     * @return A list of {@code CalorieLog} entries for the given user ID.
     */
    List<CalorieLog> findByUserId(Long userId);

    /**
     * Retrieves a list of all {@link CalorieLog} entries for a specific user on a specific date.
     *
     * @param userId The ID of the user.
     * @param logDate The {@link LocalDate} for which to retrieve the logs.
     * @return A list of {@code CalorieLog} entries matching the user ID and log date.
     */
    List<CalorieLog> findByUserIdAndLogDate(Long userId, LocalDate logDate);

}