CREATE TABLE IF NOT EXISTS materials(
    id BIGINT(64) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type_code INT(11) NOT NULL
    manufacturer VARCHAR(255) NULL,
    stocks BIGINT(64) NULL,
    updated_by VARCHAR(64) NULL,
    created_at TIMESTAMP
)