// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod menu;
mod database {
  pub mod setup; // Declare the `setup` module inside the `datebase` folder
}
use database::setup;

fn main() {
    tauri::Builder::default()
          .invoke_handler(tauri::generate_handler![setup::create_new_database ])
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
                setup::open_file_dialog(window.clone());
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
