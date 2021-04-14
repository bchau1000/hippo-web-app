const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken'); // JSON Web Token for user authenticatio
const bodyParser = require('body-parser'); // To parse JSON requests
const pool = require("./config");
const app = express();
const port = 9000;

// Master access token for JWT
const secretToken = 'testing';


////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////MIDDLEWARE//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// Libraries
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.set("json spaces", 2);


// User Auth Middleware:
//  Remove authJWT in app.get() functions to test
//  URLs WITHOUT user authentication
const authJWT = (request, response, next) => {
  const auth = request.headers.authorization;

  if(auth) {
    const token = auth.split(' ')[1];

    jwt.verify(token, secretToken, (err, user) => {
      if(err)
        return response.sendStatus(403);

      request.user = user;
      next();
    });
  }
  else {
    response.sendStatus(401);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////USER REQUEST FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// Get all sets belonging to a user
app.post("/api/users/sets", authJWT, (request, response) => {
  const {id} = request.user;

  pool.query(
    "SELECT * FROM study_sets WHERE user_id = ?",
    id,
    (error, result) => {
      if(error) response.status(400).send(error);
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
        if(error) response.status(400).send(error);
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
      if(error) response.status(400).send(error);

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
      if(error) response.status(400).send(error);
      else {
        response.status(201).send(`User added with ID: ${result.insertId}`);
      }
      
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      response.status(400).send(`Username already taken`);
  }
});

// TO DO: Authenticate a user
app.post("/api/login", (request, response) => {
  const {username, password} = request.body;
  try {
    pool.query(
      "SELECT id, username, email\n" +
      "FROM users\n" +
      "WHERE username = ? AND password = ?", 
      [username, password],
      (error, result) => {
      if(error) response.status(400).send(error);

      if(result[0] === undefined)
        response.status(400).json({"accessToken": null});
      else {

        const accessToken = jwt.sign({id: result[0].id, username: result[0].username, email: result[0].email}, secretToken);
        response.status(200).json({
          accessToken,

        });
      }
    });
  } catch (err) {
    response.status(404).send(err);
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

/*
SCRAPPED FOR NOW
app.get("/api/users/:user_id/sets", (request, response) => {
  const user_id = request.params.user_id;

  pool.query(
    "SELECT * FROM study_sets WHERE user_id = ?",
    user_id,
    (error, result) => {
      if(error) response.status(400).send(error);
      response.status(201).send(result);
    }
  );
});
*/