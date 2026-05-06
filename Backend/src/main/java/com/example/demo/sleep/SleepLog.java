package com.example.demo.sleep;

import java.time.LocalDate;

import com.example.demo.appuser.AppUser;
import jakarta.persistence.*;

@Entity
@Table(name = "sleep_log")
public class SleepLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    /**
     * Date the sleep was logged
     */
    private LocalDate sleepDate;

    /**
     * Total hours slept
     */
    private double hoursSlept;

    /**
     * User's sleep goal in hours
     */
    private double sleepGoal;

    public SleepLog() {}

    public Long getId() {
        return id;
    }

    public AppUser getUser() {
        return user;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }

    public LocalDate getSleepDate() {
        return sleepDate;
    }

    public void setSleepDate(LocalDate sleepDate) {
        this.sleepDate = sleepDate;
    }

    public double getHoursSlept() {
        return hoursSlept;
    }

    public void setHoursSlept(double hoursSlept) {
        this.hoursSlept = hoursSlept;
    }

    public double getSleepGoal() {
        return sleepGoal;
    }

    public void setSleepGoal(double sleepGoal) {
        this.sleepGoal = sleepGoal;
    }
}
