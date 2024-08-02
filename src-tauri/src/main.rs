// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


    //Window Menu
    // let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    // let close = CustomMenuItem::new("close".to_string(), "Close");
    // let dark_mode = CustomMenuItem::new("dark".to_string(), "Dark Mode");
    // let light_mode = CustomMenuItem::new("dark".to_string(), "Light Mode");
    // let filesubmenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
    // let viewsubmenu = Submenu::new("View", Menu::new().add_item(dark_mode).add_item(light_mode));

    // let menu = Menu::new()
    // .add_native_item(MenuItem::Copy)
    // .add_item(CustomMenuItem::new("hide", "Hide"))
    // .add_submenu(filesubmenu)
    // .add_submenu(viewsubmenu);

fn create_window_menu() -> Menu{
    return Menu::new()
    .add_submenu(Submenu::new( "App", Menu::new()
        .add_native_item(MenuItem::Quit)
    ))
    .add_submenu(Submenu::new( "File", Menu::new()
        .add_item(CustomMenuItem::new("new".to_string(), "New").accelerator("CmdOrCtrl+N"))
        .add_item(CustomMenuItem::new("open".to_string(), "Open").accelerator("CmdOrCtrl+O"))
        .add_native_item(MenuItem::Separator)
        .add_item(CustomMenuItem::new("save".to_string(), "Save").accelerator("CmdOrCtrl+S"))
    ))
    .add_submenu(Submenu::new( "View", Menu::new()
        .add_item(CustomMenuItem::new("dark".to_string(), "Dark Mode"))
        .add_item(CustomMenuItem::new("light".to_string(), "Light Mode"))
        .add_native_item(MenuItem::Separator)
    ));
}

//Main 
fn main() {

    tauri::Builder::default()
        .menu(create_window_menu())
        .on_menu_event(|event| {
          let window = event.window();
            match event.menu_item_id() {
              "quit" => {
                std::process::exit(0);
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
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
