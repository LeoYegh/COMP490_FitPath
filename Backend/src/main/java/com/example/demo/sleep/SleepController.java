package com.example.demo.sleep;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sleep")
@CrossOrigin
public class SleepController {

    private final SleepService service;

    public SleepController(SleepService service) {
        this.service = service;
    }

    @GetMapping
    public List<SleepLog> getSleepLogs() {
        return service.getAllSleepLogs();
    }

    @PostMapping
    public SleepLog createSleepLog(@RequestBody SleepLog sleepLog) {
        return service.saveSleepLog(sleepLog);
    }
}
