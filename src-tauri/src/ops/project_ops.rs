
use crate::models::{NewProject, Project};
use crate::db::establish_connection;

pub fn create_project(project: NewProject){
    println!("Creating Project: {:?}", project);
    use crate::schema::project::dsl::*;
    let connection = establish_connection("/Users/matthewmalone/Desktop/Taco.sqlite");
    let new_project = NewProject{
        name: &project.name,
    };

    diesel::insert_into(project).values(&new_project).execute(&connection).expect("Error saving new project")
}

pub fn show_project(){
    println!("Showing project");
    use crate::schema::project::dsl::*;

    let connection = establish_connection("/Users/matthewmalone/Desktop/Taco.sqlite");
    let result = project.load::<Project>(&connection).expect("Error loading project data");

}