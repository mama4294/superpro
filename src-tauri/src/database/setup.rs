use diesel::prelude::*;
use diesel::sqlite::SqliteConnection;
use std::fs;
use tauri::api::dialog::FileDialogBuilder;
use tauri::Window;


// diesel::table! {
//     project () {
//         name -> Varchar,
//     }
// }

#[tauri::command(rename_all = "snake_case")]
pub fn create_new_database(window: tauri::Window, folder_path: String, project_name:String) {
    println!("create_new_database function called");

    let database_url = format!("{}/{}.sqlite", folder_path, project_name);

    println!("Folder path: {}", folder_path);
    println!("Project name: {}", project_name);
    println!("Database URL: {}", database_url);

    // Ensure the folder exists
    match fs::create_dir_all(&folder_path) {
        Ok(_) => println!("Folder created successfully."),
        Err(e) => {
            println!("Error creating folder: {}", e);
            window.emit("database-error", e.to_string()).unwrap();
            return;
        }
    }

   // Establish the connection using the specified file path
   match establish_connection(&database_url) {
    Ok(_) => {
        println!("Database connection established.");
        window.emit("database-created", database_url).unwrap();
    }
    Err(e) => {
        println!("Error establishing database connection: {}", e);
        window.emit("database-error", e.to_string()).unwrap();
    }
}


}

pub fn establish_connection(database_url: &str) -> Result<SqliteConnection, diesel::ConnectionError> {
    SqliteConnection::establish(database_url)
}


// #[tauri::command]
// pub fn create_new_database(window: Window) -> Result<()> {
//     let path = PathBuf::from("new_database.sqlite");
//     let conn = Connection::open(&path)?;
    
//     // You can also execute SQL statements to initialize your database here if needed.
//     // Example:
//     // conn.execute(
//     //     "CREATE TABLE person (
//     //         id INTEGER PRIMARY KEY,
//     //         name TEXT NOT NULL
//     //     )",
//     //     [],
//     // )?;

//     window.emit("database-created", path.to_string_lossy().into_owned()).unwrap();
//     Ok(())
// }

#[tauri::command]
pub fn open_file_dialog(window: Window) {
    FileDialogBuilder::new().pick_file(move |selected_file| {
        if let Some(file_path) = selected_file {
            window.emit("file-selected", file_path.to_string_lossy().into_owned()).unwrap();
        }
    });
}