package com.example.demo.sleep;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SleepService {

    private final SleepRepository repository;

    public SleepService(SleepRepository repository) {
        this.repository = repository;
    }

    public List<SleepLog> getAllSleepLogs() {
        return repository.findAll();
    }

    public SleepLog saveSleepLog(SleepLog sleepLog) {
        return repository.save(sleepLog);
    }
}
