CREATE TABLE IF NOT EXISTS models_materials(
    id BIGINT(64) AUTO_INCREMENT PRIMARY KEY,
    model_id BIGINT(64),
    material_id BIGINT(64),
    created_at TIMESTAMP,
    FOREIGN KEY (model_id) REFERENCES models(id),
    FOREIGN KEY (material_id) REFERENCES materials(id)
)