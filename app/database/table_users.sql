CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    department_id INT,
    created_at TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id)
)

INSERT INTO users (id, username, password, department_id) VALUES (99, 'admin', '$2b$10$I2AfnkqcxX2uyuqQcGH3.eVL9x8R0TIcKvPeAeveFwtbqjAIbZNcK', 905);
