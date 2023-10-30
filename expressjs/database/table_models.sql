CREATE TABLE IF NOT EXISTS models(
    id BIGINT(64) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    target_quantity BIGINT(64) NULL,
    total_output BIGINT(64) NULL,
    stocks BIGINT(64) NULL,
    updated_by VARCHAR(255) NULL,
    created_at TIMESTAMP
)