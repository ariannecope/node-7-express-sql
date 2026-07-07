// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

// import Node modules
import express from "express";
import pg from "pg"; // pg stands for PostgreSQL - connecting to database

// import configuration file
import config from "./config.js";

// connect to our PostgreSQL database, db for short
const db = new pg.Pool({
    connectionString: config.databaseUrl,
    ssl: true
});

const app = express(); // creating an instance of the express module

app.use(express.json()); // This server will receive and respond in JSON format

const port = 3000; // Setting which port to listen to to receive requests

//defining our port, then turning on our server to listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllAnimals()
async function getAllAnimals() {
    //query the  on neon
    const result = await db.query("SELECT * FROM animals");
    // console.log("result", result.rows)
    //return the right data
    return result.rows;


}

// 2. getOneAnimalByName(name)
async function getOneAnimalByName(name) {
    // query db store in variable

    const result = await db.query("SELECT * FROM animals WHERE name = $1", [name])
    //return the right thing
    return result.rows[0];
}

// 3. getOneAnimalById(id)
async function getOneAnimalById(id) {
    const result = await db.query("SELECT * FROM animals WHERE id= $1", [id])
    //return the right thing
    return result.rows[0];
}

// 4. getNewestAnimal()
async function getNewestAnimal() {
    const result = await db.query(
        "SELECT * FROM animals ORDER BY id DESC LIMIT 1"
    );

    return result.rows[0];
}

// 5. getAllMammals()
async function getAllMammals() {
    const result = await db.query(
        "SELECT * FROM animals WHERE category = 'mammal'"
    );

    return result.rows;
}

// 6. getAnimalsByCategory(category)
async function getAnimalsByCategory(category) {
    const result = await db.query(
        "SELECT * FROM animals WHERE category = $1",
        [category]
    );

    return result.rows;
}

// 7. deleteOneAnimal(id)

// 8. addOneAnimal(name, category, can_fly, lives_in)

// 9. updateOneAnimalName(id, newName)

// 10. updateOneAnimalCategory(id, newCategory)

// 11. 🌟 BONUS CHALLENGE — addManyAnimals(animals)


// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-animals
app.get("/get-all-animals", async (req, res) => {
    //helper function
    const animals = await getAllAnimals();
    //response
    res.json(animals)
})

// 2. GET /get-one-animal-by-name/:name
app.get("/get-one-animal-by-name/:name", async (req, res) => {
    const name = req.params.name;
    const animal = await getOneAnimalByName(name);
    // send it back!
    res.json(name)
})

// 3. GET /get-one-animal-by-id/:id
app.get("/get-one-animal-by-id/:id", async (req, res) => {
    const id = req.params.id;

    console.log("ID received:", id);

    const animal = await getOneAnimalById(id);

    res.json(animal);
});

// 4. GET /get-newest-animal
app.get("/get-newest-animal", async (req, res) => {
    const animal = await getNewestAnimal();

    res.json(animal);
});

// 5. GET /get-all-mammals
app.get("/get-all-mammals", async (req, res) => {
    const mammals = await getAllMammals();

    res.json(mammals);
});

// 6. 🌟 BONUS CHALLENGE — GET /get-animals-by-category/:category

app.get("/get-animals-by-category/:category", async (req, res) => {
    const category = req.params.category;

    const animals = await getAnimalsByCategory(category);

    res.json(animals);
});

// 7. POST /delete-one-animal/:id

// 8. POST /add-one-animal

// 9. POST /update-one-animal-name

// 10. POST /update-one-animal-category

// 11. 🌟 BONUS CHALLENGE — POST /add-many-animals
