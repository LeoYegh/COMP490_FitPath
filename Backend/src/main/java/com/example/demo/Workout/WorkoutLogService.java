package com.example.demo.Workout;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class WorkoutLogService {

    private final WorkoutLogRepository repository;

    public WorkoutLogService(WorkoutLogRepository repository) {
        this.repository = repository;
    }

    public List<WorkoutLog> getAllWorkoutLogs() {
        return repository.findAll();
    }

    public WorkoutLog saveWorkoutLog(WorkoutLog workoutLog) {
        return repository.save(workoutLog);
    }
}