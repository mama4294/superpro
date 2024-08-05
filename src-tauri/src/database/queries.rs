pub const CREATE_PROJECTS_TABLE: &str = "
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    data TEXT NOT NULL
);";

pub const INSERT_PROJECT: &str = "
INSERT INTO projects (name, data) VALUES (?1, ?2);";

pub const SELECT_PROJECT: &str = "
SELECT id, name, data FROM projects WHERE id = ?1;";