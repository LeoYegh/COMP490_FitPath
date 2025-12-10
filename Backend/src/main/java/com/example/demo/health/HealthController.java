package com.example.demo.health;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class HealthController {
    @GetMapping("/")
    public String health() {
        return "OK";
    }
    
}
