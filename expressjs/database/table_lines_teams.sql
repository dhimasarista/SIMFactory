CREATE TABLE IF NOT EXISTS lines_teams(
    id INT(64) AUTO_INCREMENT PRIMARY KEY,
    production_lines_id INT(64),
    teams_id INT(64),
    models_id BIGNT(64),
    status VARCHAR(64),
    shift INT(64),
    created_at TIMESTAMP,
    FOREIGN KEY (production_lines_id) REFERENCES production_lines(id),
    FOREIGN KEY (teams_id) REFERENCES teams(id)
)
 