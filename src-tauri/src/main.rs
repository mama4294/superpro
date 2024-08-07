// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[macro_use]
extern crate diesel;

mod menu;
mod db;
mod schema;
mod models;

fn main() {
    tauri::Builder::default()
          .invoke_handler(tauri::generate_handler![db::create_new_project ])
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
                db::open_file_dialog(window.clone());
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
