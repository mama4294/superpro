use crate::schema::project;

#[derive(Insertable)]
#[table_name = "project"]
pub struct NewProject<'a>{
    pub name: &'a str,
}

#[derive(Debug, Queryable, AsChangeset)]
pub struct Project<'a>{
    pub name: &'a str,
}