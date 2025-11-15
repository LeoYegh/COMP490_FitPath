/**
 * Title: DemoApplication.java
 *
 * Description: The main entry point for the Spring Boot application.
 * This class uses SpringBootApplication to enable auto-configuration,
 * component scanning, and configuration properties.
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The main application class for the Spring Boot project.
 * ait comes with Configuration, EnableAutoConfiguration,
 * and  ComponentScan.
 */
@SpringBootApplication
public class DemoApplication {

    /**
     * The main method which uses Spring Boot's 
     * method to launch the application.
     *
     * @param args Command line arguments passed to the application.
     */
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}