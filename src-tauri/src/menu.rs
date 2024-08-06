use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};


pub fn create_window_menu() -> Menu {
    return Menu::new()
        .add_submenu(Submenu::new(
            "App",
            Menu::new().add_native_item(MenuItem::Quit),
        ))
        .add_submenu(Submenu::new(
            "File",
            Menu::new()
                .add_item(CustomMenuItem::new("new".to_string(), "New").accelerator("CmdOrCtrl+N"))
                .add_item(
                    CustomMenuItem::new("open".to_string(), "Open").accelerator("CmdOrCtrl+O"),
                )
                .add_native_item(MenuItem::Separator)
                .add_item(
                    CustomMenuItem::new("save".to_string(), "Save").accelerator("CmdOrCtrl+S"),
                ),
        ))
        .add_submenu(Submenu::new(
            "View",
            Menu::new()
                .add_item(CustomMenuItem::new("dark".to_string(), "Dark Mode"))
                .add_item(CustomMenuItem::new("light".to_string(), "Light Mode"))
                .add_native_item(MenuItem::Separator),
        ))
        .add_submenu(Submenu::new(
            "Tasks",
            Menu::new().add_item(CustomMenuItem::new(
                "addIngredient".to_string(),
                "Add Ingredient",
            )),
        ));
}





