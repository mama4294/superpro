// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod menu;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

fn main() {
    tauri::Builder::default()
        .menu(menu::create_window_menu())
        .on_menu_event(|event| {
          let window = event.window();
            match event.menu_item_id() {
              "quit" => {
                std::process::exit(0);
              }
              "open" => {
                menu::open_file_dialog(window.clone());
            }
              "dark" => {
                window.emit("theme-change", "dark").unwrap();
            }
            "light" => {
                window.emit("theme-change", "light").unwrap();
            }
              _ => {}
            }
          })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
