package com.example.demo.sleep;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SleepRepository extends JpaRepository<SleepLog, Long> {
}