// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;
mod state;
mod menu;

use database::Item;
use state::{AppState, ServiceAccess};
use tauri::{State, Manager, AppHandle};

#[tauri::command]
fn greet(app_handle: AppHandle, name: &str) -> Vec<Item> {
  // Should handle errors instead of unwrapping here
  println!("Greet received from front end");
  app_handle.db(|db| database::add_item(name, db)).unwrap();
  let items = app_handle.db(|db| database::get_all(db)).unwrap();
  items
}


fn main() {
    tauri::Builder::default()
        .manage(AppState { db: Default::default() })
        .invoke_handler(tauri::generate_handler![greet])        
        .setup(|app| {
          let handle = app.handle();

          let app_state: State<AppState> = handle.state();
          let db = database::initialize_database(&handle).expect("Database initialize should succeed");
          *app_state.db.lock().unwrap() = Some(db);

          Ok(())
      })
        .menu(menu::create_window_menu())
        .on_menu_event(|event| {
          let window = event.window();
            match event.menu_item_id() {
              "quit" => {
                std::process::exit(0);
              }
              "new" => {
                window.emit("new-project-dialog",{}).unwrap();
            }
              "open" => {
                // db::open_file_dialog(window.clone());
            }
              "dark" => {
                window.emit("theme-change", "dark").unwrap();
                println!("Dark Mode Activated");
            }
            "light" => {
                window.emit("theme-change", "light").unwrap();
                println!("Light Mode Activated");
            }
              _ => {}
            }
          })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
