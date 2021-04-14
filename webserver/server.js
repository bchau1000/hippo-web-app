const express = require("express");
const cors = require("cors");
const pool = require("./config");
const app = express();
const port = 9000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.set("json spaces", 2);

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////USER REQUEST FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// Get all sets belonging to a user
app.get("/api/users/:user_id/sets", (request, response) => {
  const user_id = request.params.user_id;

  pool.query(
    "SELECT * FROM study_sets WHERE user_id = ?",
    user_id,
    (error, result) => {
      if(error) response.send(error);
      response.status(201).send(result);
    }
  );
});

// Get all cards belonging to a set
app.get("/api/sets/:set_id/cards", (request, response) => {
  const set_id = request.params.set_id;
  try {
    pool.query(
      "SELECT f.id as 'id', f.term as 'term', f.definition as 'definition'\n" +
      "FROM study_sets as s JOIN flash_cards as f\n" + 
      "WHERE s.id = f.set_id AND s.id = ?",
      set_id,
      (error, result) => {
        if(error) response.status(404).send(error);
        response.status(201).send(result);
      }
    );
  } catch (err) {
    response.status(404).send(err);
  }
});

// END USER REQUEST FUNCTIONS


////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////CREATE SET FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// TO DO: Insert a new set 
app.get("/api/users/:id/sets/new", (request, response) => {
  console.log(request.body);
  try {
    pool.query("INSERT INTO study_sets SET ?", request.body, (error, result) => {
      if (error) response.send(error);

      response.status(201).send(`Study set has been created: ${result.insertId}`);
    });
  } catch (err) {
    response.status(404).send(err);
  }
});

// END CREATE SET FUNCTIONS


////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////REGISTER/LOGIN FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// TO DO: Register a new user
app.post("/api/register", (request, response) => {
  console.log(request.body);
  try {
    pool.query("INSERT INTO users SET ?", request.body, (error, result) => {
      if(error) response.send(error);
      response.status(201).send(`User added with ID: ${result.insertId}`);
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      response.status(400).send(`User name already taken`);
  }
});

// TO DO: Authenticate a user
app.post("/api/login", (request, response) => {
  console.log(request.body);
  try {
    pool.query("INSERT INTO users SET ?", request.body, (error, result) => {
      if(error) response.send(error);
      response.status(201).send(`User added with ID: ${result.insertId}`);
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      response.status(400).send(`User name already taken`);
  }
});

// END REGISTER/LOGIN FUNCTIONS


app.get("*", (request, response) => {
  response
    .status(404)
    .send('404 Page Not Found');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});