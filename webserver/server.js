require('dotenv').config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
//const async = require("async");
const pool = require("./config");
const app = express();
const port = 9000;

// Master access tokens for JWT, MUST CHANGE DURING DEPLOYMENT
const secretToken = process.env.JWT_SECRET;
const refreshSecretToken = process.env.JWT_SECRET_REFRESH;
let refreshTokens = [];

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////MIDDLEWARE//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// Libraries
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.set("json spaces", 2);

// User Auth Middleware:
//  Remove authJWT in app.get() functions to test
//  URLs WITHOUT user authentication
const authJWT = (request, response, next) => {
    const auth = request.headers.authorization;

    if (auth) {
        const token = auth.split(" ")[1];

        jwt.verify(token, secretToken, (err, user) => {
            if (err) return response.sendStatus(403);

            request.user = user;
            next();
        });
    } else {
        response.sendStatus(401);
    }
};

app.get("/api/test", (_, response) => { 
    try {
        pool.query(
            "SHOW TABLES",
            (error, result) => {
                if (error) response.status(400).send(error);

                if (result.length)
                    response.status(201).send(result);
                else {
                    response.status(404).send("404 Not Found");
                }
            }
        );
    }
    catch (err) {
        response.status(404).send(err);
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////USER REQUEST FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// Get all sets belonging to a user
app.get("/api/:username/sets", (request, response) => {
    const username = request.params.username;

    try {
        pool.query(
            "SELECT s.id as 'id', s.title as 'title', s.description as 'description'\n" +
            "FROM sets as s JOIN (SELECT id FROM users WHERE username=?) as u\n" +
            "WHERE s.user_id = u.id;\n"
            ,
            username,
            (error, result) => {
                if (error) response.status(400).send(error);
                if (result)
                    response.status(201).send(result);
                else {
                    response.status(404).send("404 Not Found");
                }


            }
        );
    }
    catch (err) {
        response.status(404).send(err);
    }
});

app.post("/api/users/sets/edit", authJWT, (request, response) => {

});

// Get all cards belonging to a set
app.get("/api/sets/:set_id/cards", (request, response) => {
    const set_id = request.params.set_id;
    try {
        pool.query(
            "SELECT s.title as 'title', s.description as 'description',\n" +
            "       f.id as 'id', f.term as 'term', f.definition as 'definition'\n" +
            "FROM sets as s JOIN flash_cards as f\n" +
            "WHERE s.id = f.set_id AND s.id = ?",
            set_id,
            (error, result) => {
                if (error) response.status(400).send(error);
                else {

                    const length = result.length;
                    if (length) {
                        let send = {
                            "title": "",
                            "description": "",
                            "flash_cards": [],
                        };
                        send.title = result[0].title;
                        send.description = result[0].description;
                        send.flash_cards = [];

                        for (let i = 0; i < length; i++) {
                            send.flash_cards.push({
                                "id": result[i].id,
                                "term": result[i].term,
                                "definition": result[i].definition,
                            });
                        }
                        response.status(201).send(send)
                    }
                    else {
                        response.status(404).send("404 Not Found");
                    }


                };
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

// Insert a new set
app.put("/api/sets/new", authJWT, (request, response) => {
    const {
        id
    } = request.user;
    const studySet = request.body;

    try {
        pool.query(
            "INSERT INTO sets(title, description, user_id) VALUES(?, ?, ?)",
            [studySet.title, studySet.description, id],
            (error, result) => {
                if (error) {
                    console.log(error);
                    response.status(400).send(error);
                } else {
                    const flashCards = studySet.flash_cards;
                    const numCards = flashCards.length;
                    let values = [];

                    for (let i = 0; i < numCards; i++) {
                        values.push(new Array(
                            flashCards[0].term,
                            flashCards[0].def,
                            1,
                            result.insertId));
                    }

                    pool.query(
                        "INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES ?",
                        [values],
                        (error, result) => {
                            if (error) {
                                console.log(error);
                                response.status(400).send(error);
                            }
                            console.log(values);
                            response.status(200).send(result);
                        }
                    );
                }
            }
        );
    } catch (err) {
        console.log(err);
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
            if (error) response.status(400).send(error);
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
    const {
        username,
        password
    } = request.body;

    try {
        pool.query(
            "SELECT id, username, email\n" +
            "FROM users\n" +
            "WHERE username = ? AND password = ?",
            [username, password],
            (error, result) => {
                if (error) response.status(400).send(error);

                if (result[0] === undefined)
                    response.status(400).json({
                        accessToken: null,
                    });
                else {
                    const accessToken = jwt.sign(
                        {
                            id: result[0].id,
                            username: result[0].username,
                            email: result[0].email,

                        },
                        secretToken,
                        { expiresIn: '20m' }
                    );

                    const refreshToken = jwt.sign(
                        {
                            id: result[0].id,
                            username: result[0].username,
                            email: result[0].email,
                        },
                        refreshSecretToken
                    );

                    refreshTokens.push(refreshToken);

                    response.status(201).json({
                        accessToken,
                        refreshToken
                    });
                }
            }
        );
    } catch (err) {
        response.status(404).send(err);
    }
});

app.post('/api/logout', (request, response) => {
    const { token } = request.body;

    // Expire the refresh token if a user logs out
    for (let i = 0; i < refreshTokens.length; i++)
        if (refreshTokens[i] == token)
            refreshTokens.splice(i, 1);

    response.status(200).send("Successfully logged out");
});

app.post('/api/token', (request, response) => {
    const { token } = request.body;

    if (!token)
        response.status(401);

    if (!refreshTokens.includes(token))
        response.status(403);

    jwt.verify(token, refreshSecretToken, (error, user) => {
        if (error)
            response.status(403);
        const accessToken = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            secretToken,
            { expiresIn: '20m' }
        );
    });
});

// END REGISTER/LOGIN FUNCTIONS

app.get("*", (request, response) => {
    response.status(404).send("404 Page Not Found");
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});