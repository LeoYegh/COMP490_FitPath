package com.example.demo.db;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class SchemaFixRunner implements CommandLineRunner {

    private final JdbcTemplate jdbc;

    // change if your schema name isn't "registration"
    private static final String SCHEMA = "registration";
    private static final String CHILD_TABLE = "confirmation_token";
    private static final String PARENT_TABLE = "app_user";
    private static final String CHILD_COL = "app_user_id";
    private static final String NEW_FK_NAME = "fk_confirmation_token_app_user";

    public SchemaFixRunner(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public void run(String... args) {
        log.info(">>> Running one-time schema fix for {}.{}", SCHEMA, PARENT_TABLE);
        try {
            // A) Already auto-increment? bail early
            Boolean alreadyAuto = jdbc.query(
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
                jdbc.execute("ALTER TABLE %s.%s DROP FOREIGN KEY `%s`"
                    .formatted(SCHEMA, CHILD_TABLE, fk));
            }

            // 3) Drop leftover index(es) on app_user_id if they exist (Workbench often leaves one)
            List<String> idxNames = jdbc.query(
                "SHOW INDEX FROM %s.%s WHERE Column_name = '%s'"
                    .formatted(SCHEMA, CHILD_TABLE, CHILD_COL),
                (rs, i) -> rs.getString("Key_name")
            );
            for (String idx : idxNames) {
                if (!"PRIMARY".equalsIgnoreCase(idx)) {
                    log.info("Dropping index {} on {}.{}", idx, SCHEMA, CHILD_TABLE);
                    jdbc.execute("DROP INDEX `%s` ON %s.%s".formatted(idx, SCHEMA, CHILD_TABLE));
                }
            }

            // 4) Make parent PK auto-increment (with FK checks off just in case)
            log.info("Altering {}.{} to make id AUTO_INCREMENT", SCHEMA, PARENT_TABLE);
            jdbc.execute("SET FOREIGN_KEY_CHECKS = 0");
            jdbc.execute("""
                ALTER TABLE %s.%s
                MODIFY COLUMN id BIGINT NOT NULL AUTO_INCREMENT
            """.formatted(SCHEMA, PARENT_TABLE));
            jdbc.execute("SET FOREIGN_KEY_CHECKS = 1");

            // 5) Recreate FK with a clean, unique name (if child col exists)
            Integer childColCount = jdbc.query(
                "SHOW COLUMNS FROM %s.%s LIKE '%s'".formatted(SCHEMA, CHILD_TABLE, CHILD_COL),
                (rs, i) -> 1
            ).size();
            if (childColCount > 0) {
                log.info("Re-adding FK {} on {}.{}", NEW_FK_NAME, SCHEMA, CHILD_TABLE);
                jdbc.execute("""
                    ALTER TABLE %s.%s
                    ADD CONSTRAINT `%s`
                    FOREIGN KEY (`%s`) REFERENCES %s.%s(`id`)
                    ON DELETE CASCADE
                """.formatted(SCHEMA, CHILD_TABLE, NEW_FK_NAME, CHILD_COL, SCHEMA, PARENT_TABLE));
            } else {
                log.warn("Child column {}.{} not found; skipping FK recreate.", CHILD_TABLE, CHILD_COL);
            }

            log.info(">>> Schema fix complete. Remove or disable SchemaFixRunner now.");
        } catch (Exception e) {
            log.error("Schema fix failed", e);
            // throw e; // uncomment if you want startup to fail on error
        }
    }
}
