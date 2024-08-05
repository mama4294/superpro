use serde::{Deserialize, Serialize};
use tauri::State;
use tauri_plugin_sql::{Migration, MigrationKind, TauriSql};

#[derive(Serialize, Deserialize)]
pub struct QueryResult {
    pub success: bool,
    pub data: Option<String>,
}

#[tauri::command]
pub async fn initialize_database(db: TauriSql) -> Result<(), String> {
    db.run_migrations(vec![Migration {
        version: 1,
        description: "create projects table",
        sql: include_str!("migrations/ingredient_table.sql"),
        kind: MigrationKind::Up,
    }])
    .await
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn execute_query(db: TauriSql, query: String) -> Result<QueryResult, String> {
    db.execute(query)
        .await
        .map(|data| QueryResult {
            success: true,
            data: Some(data),
        })
        .map_err(|e| e.to_string())
}
