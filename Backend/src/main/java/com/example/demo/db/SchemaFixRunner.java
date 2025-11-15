/**
 * Title: SchemaFixRunner.java
 *
 * Description: One-time utility executed on application startup to fix common schema
 * issues, specifically ensuring the primary key of the 'app_user' table is set
 * to AUTO_INCREMENT and correcting its related foreign keys.
 *
 * @author Leo Y
 * @version 1.0
 */
package com.example.demo.db;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * A one-time  component designed to fix common database schema
 * issues encountered when using JPA with certain database dilects, it 
 * uses alot of spring boots code so check their doc to learn more 
 * 
 */
@Slf4j
@Component
public class SchemaFixRunner implements CommandLineRunner {

    /**
     * Spring's utility for executing SQL queries and updates against the database.
     */
    private final JdbcTemplate jdbc;

    /**
     * The name of the database schema (defaulted to "fitpath").
     */
    private static final String SCHEMA = "fitpath";
    
    /**
     * The name of the child table (the one containing the foreign key).
     */
    private static final String CHILD_TABLE = "confirmation_token";
    
    /**
     * The name of the parent table (the one receiving the AUTO_INCREMENT fix).
     */
    private static final String PARENT_TABLE = "app_user";
    
    /**
     * The name of the column in the child table that references the parent table's primary key.
     */
    private static final String CHILD_COL = "app_user_id";
    
    /**
     * The desired name for the re-created foreign key constraint.
     */
    private static final String NEW_FK_NAME = "fk_confirmation_token_app_user";

    /**
     * Constructs the SchemaFixRunner and injects the necessary {@link JdbcTemplate}.
     *
     * @param jdbc The Spring JDBC template.
     */
    public SchemaFixRunner(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * Executes the schema fix logic when the Spring Boot application starts up.
     * <p>
     * The execution involves:
     * 1. Checking the primary key status to skip if already {@code AUTO_INCREMENT}.
     * 2. Identifying and dropping any existing foreign key constraints on the child table.
     * 3. Dropping any residual indexes left behind after the foreign key removal.
     * 4. Modifying the parent table's primary key (`id`) to be {@code AUTO_INCREMENT}.
     * 5. Recreating the foreign key constraint on the child table, ensuring data integrity.
     * </p>
     *
     * @param args Command line arguments passed to the application.
     */
    @Override
    public void run(String... args) {
        log.info(">>> Running one-time schema fix for {}.{}", SCHEMA, PARENT_TABLE);
        try {
            // A) Already auto-increment? bail early
            final Boolean alreadyAuto = jdbc.query(
                "SHOW COLUMNS FROM " + SCHEMA + "." + PARENT_TABLE + " LIKE 'id'",
                (rs, i) -> rs.getString("Extra") != null && rs.getString("Extra").toLowerCase().contains("auto_increment")
            ).stream().findFirst().orElse(false);

            if (Boolean.TRUE.equals(alreadyAuto)) {
                log.info("id is already AUTO_INCREMENT on {}.{} — skipping fix.", SCHEMA, PARENT_TABLE);
                return;
            }

            // 1) Find any FK from confirmation_token -> app_user
            List<String> fkNames = jdbc.query(
                """
                SELECT CONSTRAINT_NAME
                FROM information_schema.KEY_COLUMN_USAGE
                WHERE TABLE_SCHEMA = ?
                  AND TABLE_NAME = ?
                  AND REFERENCED_TABLE_NAME = ?
                GROUP BY CONSTRAINT_NAME
                """,
                ps -> {
                    ps.setString(1, SCHEMA);
                    ps.setString(2, CHILD_TABLE);
                    ps.setString(3, PARENT_TABLE);
                },
                (rs, i) -> rs.getString("CONSTRAINT_NAME")
            );

            // 2) Drop FK(s) if present
            for (String fk : fkNames) {
                log.info("Dropping FK {} on {}.{}", fk, SCHEMA, CHILD_TABLE);
                String sql = String.format(
                    "ALTER TABLE `%s`.`%s` DROP FOREIGN KEY `%s`",
                    SCHEMA, CHILD_TABLE, fk
                );
                jdbc.execute(sql);
            }
        } catch (Exception e) {
            log.error("Error while executing schema fix for {}.{}", SCHEMA, PARENT_TABLE, e);
        }
    }
}