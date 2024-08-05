#[macro_use]
extern crate diesel;

use diesel::prelude::*;
use diesel::sqlite::SqliteConnection;


// Types
table! {
    person (id) {
        id -> Integer,
        name -> Text,
    }
}

#[derive(Serialize, Deserialize)]
struct Person {
    id: i32,
    name: String,
    data: Option<Vec<u8>>,
}

#[command]
fn open_database(path: String) -> Result<Vec<Person>, String> {
    let connection = SqliteConnection::establish(path).map_err(|e| e.to_string())?
        .expect("Error connecting to database");

    diesel::sql_query("CREATE TABLE IF NOT EXISTS person (id INTEGER PRIMARY KEY, name TEXT NOT NULL)")
        .execute(&connection)
        .expect("Error creating table");

    let new_person = NewPerson { name: "John Doe" };
    diesel::insert_into(person::table)
        .values(&new_person)
        .execute(&connection)
        .expect("Error inserting person");
}