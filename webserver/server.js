require('dotenv').config();
const path = require('path');
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const async = require("async");
const pool = require("./config");
const app = express();
const port = 9000;

// Master access tokens for JWT, MUST CHANGE DURING DEPLOYMENT
const secretToken = "secret_token";
const refreshSecretToken = "refresh_secret_token";
let refreshTokens = [];

app.use(express.static(path.join(__dirname, '../app/build')));

app.use(
    express.urlencoded({
        origin: 'http://localhost:3000',
        extended: true,
    })
);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.set("json spaces", 2);

// User Auth Middleware:
//  Remove authJWT in app.get() functions to test
//  URLs WITHOUT user authentication

const authUser = (request, response, next) => {
    const token = request.cookies.token;
    const refreshToken = request.cookies.refreshToken;

    if (refreshTokens.includes(refreshToken)) {
        jwt.verify(token, secretToken, (err, user) => {
            if (err)
                return response.sendStatus(403);

            request.token = token;
            request.user = user;
            next();
        });
    }
    else {
        response.status(404).send({
            'status': 404,
            'message': 'Refresh token already expired.'
        });
    }
}

app.get("/api/test", (_, response) => {
    try {
        pool.query(
            "SHOW TABLES",
            (error, result) => {
                if (error) {
                    console.log('400 Bad Request: "/api/test"');
                    response.status(400).send(error);
                } 

                if (result.length) {
                    console.log('200 Ok: "/api/test"');
                    response.status(200).send(result);
                }
                else {
                    console.log('404 Not Found: "/api/test"');
                    response.status(404).send("400 Not Found");
                }
            }
        );
    }
    catch (err) {
        console.log('404 Not Found: "/api/test"');
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

app.put("/api/sets/edit", authUser, (request, response) => {

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

app.get('/api/:username/folders', (request, response) => {
    const username = request.params.username;
    try {
        pool.query(
            "SELECT * FROM users WHERE username = ?;",
            username,
            (error, result) => {
                if (error) {
                    response.status(401).send({
                        'status': 401,
                        'content': error
                    });
                }

                if (result.length < 1) {
                    response.status(401).send({
                        'status': 401,
                        'content': 'Username does not exist.'
                    })
                }
                else {
                    const user_id = result[0].id;
                    pool.query(
                        "SELECT f.id as 'folder_id', f.name as 'folder_name', fs.set_id as 'set_id', title, description\n" +
                        "FROM folders as f LEFT JOIN (folders_and_sets as fs, sets as s)\n" +
                        "ON f.id = fs.folder_id AND s.id = fs.set_id\n" +
                        "WHERE f.user_id = ?;",
                        user_id,
                        (error, result) => {
                            if (error) {
                                response.status(401).send({
                                    'status': 401,
                                    'content': error
                                });
                            }
                            const len = result.length;
                            let parsed = {};
                            let metaData = {};
                            let send = [];


                            for (let i = 0; i < len; i++) {
                                const set = {
                                    "id": result[i].set_id,
                                    "title": result[i].title,
                                    "description": result[i].description
                                }

                                if (parsed[result[i].folder_id] === undefined)
                                    parsed[result[i].folder_id] = [set];
                                else
                                    parsed[result[i].folder_id].push(set);

                                metaData[result[i].folder_id] = result[i].folder_name;
                            }

                            Object.keys(parsed).forEach(function (key) {
                                send.push({
                                    "id": key,
                                    "name": metaData[key],
                                    "sets": parsed[key]
                                })
                            });

                            response.status(201).send(send);
                        }
                    )
                }
            }
        )
    }
    catch (error) {
        response.status(404).send({
            'status': 404,
            'content': error
        });
    }
});

app.put("/api/folders/new", authUser, (request, response) => {
    const user_id = request.user.id;
    const folder_name = request.body.name;
    const sets = request.body.sets;
    console.log()

    try {
        pool.query(
            'INSERT INTO folders(name, user_id) VALUES(?, ?);',
            [folder_name, user_id],
            (error, result) => {
                if (error) {
                    response.status(401).send({
                        'status': 401,
                        'content': error,
                    });
                    return;
                }

                const folder_id = result.insertId;
                const len = sets.length;

                if (len == 0) {
                    response.status(201).send({
                        'status': 201,
                        'content': "Added new folder",
                    });
                }
                else {
                    let insert_sets = [];
                    for (let i = 0; i < len; i++) {
                        insert_sets.push(new Array(
                            folder_id,
                            sets[i].id
                        ));
                    }

                    pool.query(
                        'INSERT INTO folders_and_sets(folder_id, set_id) VALUES ?;',
                        [insert_sets],
                        (error, result) => {
                            if (error) {
                                response.status(401).send({
                                    'status': 401,
                                    'content': error,
                                });
                                console.log(error);
                                return;
                            }

                            response.status(201).send({
                                'status': 201,
                                'content': "Added new folder with sets",
                            });
                        }
                    )
                }

            }
        )
    }
    catch (error) {
        response.status(404).send({
            'status': 404,
            'content': error,
        })
    }
});

app.put("/api/folders/edit", authUser, (request, response) => {
    const folder_id = request.body.id;
    const sets = request.body.sets;
    const length = sets.length;
    let insertValues = [];

    for (let i = 0; i < length; i++) {
        if (folder_id !== null) {
            insertValues.push(new Array(
                folder_id,
                sets[i].id
            ));
        }
    }

    try {
        async.series([
            function (callback) {
                pool.query(
                    "DELETE FROM folders_and_sets WHERE folder_id = ?;",
                    [folder_id],
                    (error, result) => {
                        if (error) {
                            console.log(error);
                            response.status(401).send({
                                "status": 401,
                                "content": error,
                            });
                            return;
                        }

                        callback(null, result);
                    }
                );
            },
            function (callback) {
                if(length > 0) {
                    pool.query(
                        "INSERT INTO folders_and_sets(folder_id, set_id) VALUES ?;",
                        [insertValues],
                        (error, result) => {
                            if (error) {
                                console.log(error);
                                response.status(401).send({
                                    "status": 401,
                                    "content": error,
                                });
                                return;
                            }
                            callback(null, result);
                        }
                    );
                }
                else
                    callback(null, null);
                
            }
        ], function (error, result) {
            if (error) {
                console.log(error);
                response.status(401).send({
                    "status": 401,
                    "content": error,
                });
                return;
            }

            response.status(201).send({
                "status": 201,
                "content": result,
            })
        })
    }
    catch (error) {
        response.status(404).send({
            "status": 404,
            "content": error,
        });
        return;
    }
});

app.delete("/api/folders/delete", authUser, (request, response) => {
    const folder_id = request.body.folder_id;
    try {
        pool.query(
            "DELETE FROM folders WHERE id = ?;\n" +
            "DELETE FROM folders_and_sets WHERE folder_id = ?;",
            [folder_id, folder_id],
            (error, result) => {
                if (error) {
                    response.status(401).send({
                        "status": 401,
                        "content": error,
                    })
                }

                response.status(201).send({
                    "status": 201,
                    "content": result
                })
            }
        )
    }
    catch (error) {
        response.status(404).send({
            "status": 404,
            "content": error,
        });
    }
})

// END USER REQUEST FUNCTIONS

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////SETS FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// Insert a new set
app.put("/api/sets/new", authUser, (request, response) => {
    const {
        id
    } = request.user;
    const studySet = request.body;

    try {
        console.log(studySet);
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
                            flashCards[i].term,
                            flashCards[i].def,
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
                            response.status(201).send({
                                'status': 201,
                                'user': request.user.username,
                                'content': result
                            });
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

app.delete("/api/sets/delete", authUser, (request, response) => {
    const set_id = request.body.set_id;
    const user_id = request.user.id;

    try {
        async.series([
            // Confirm this user owns this study set
            // Delete this set from any folders
            // Delete all flash_cards in this set
            // Delete all subjects in this set
            // Delete the study set

            function (callback) {
                pool.query(
                    "SELECT count(*) as 'count'\n" +
                    "FROM sets\n" +
                    "WHERE id = ? AND user_id = ?;",
                    [set_id, user_id],
                    (error, result) => {
                        if (error) {
                            response.status(400).send({
                                'status': 400,
                                'message': error,
                            });
                            return;
                        }

                        if (result[0].count < 1) {
                            response.status(401).send({
                                'status': 401,
                                'message': 'Must be the owner of a set to edit/delete it'
                            })
                            return;
                        }
                        else
                            callback(null, result); // continue
                    }
                );
            },
            function (callback) {
                pool.query(
                    "DELETE FROM folders_and_sets WHERE set_id = ?;" +
                    "DELETE FROM subjects WHERE set_id = ?;" +
                    "DELETE FROM flash_cards WHERE set_id = ?;" +
                    "DELETE FROM sets WHERE id = ?;",
                    [set_id, set_id, set_id, set_id],
                    (error, result) => {
                        if (error) {
                            response.status(400).send({
                                'status': 400,
                                'message': error,
                            });
                            return;
                        }

                        callback(null, result);
                    }
                );
            },
        ], function (error, result) {
            if (error) {
                response.status(400).send({
                    'status': 400,
                    'message': error,
                });
            }

            response.status(201).send({
                'status': 201,
                'message': 'Deleted study set: ' + set_id,
                'content': result,
            });
        })

    }
    catch (err) {
        response.status(404).send({
            'status': 404,
            'message': err,
        });
    }
});

// END SETS FUNCTIONS

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////REGISTER/LOGIN FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// TO DO: Register a new user
app.post("/api/register", (request, response) => {
    const user = [request.body.username, request.body.email, request.body.password,
    request.body.firstName, request.body.lastName];
    try {
        pool.query(
            "INSERT INTO users(username, email, password, first_name, last_name) VALUES(?, ?, ?, ?, ?)",
            user,
            (error, result) => {
                if (error) {
                    console.log(error);
                    response.status(400).send(error);
                }
                else {
                    response.status(201).send({
                        'status': 201,
                        'message': 'User successfully registered.',
                        'content': result,
                    });
                }
            });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY")
            response.status(400).send({
                'status': 400,
                'message': 'Username is already taken.'
            });
        else
            response.status(404).send({
                'status': 404,
                'message': 'Error in query.'
            });
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

                if (result[0] === undefined) {
                    response.status(400).send({
                        'status': 400,
                        'message': 'Invalid username or password.'
                    })
                }
                else {
                    const accessToken = jwt.sign({
                        id: result[0].id,
                        username: result[0].username,
                        email: result[0].email,
                    },
                        secretToken,
                        { expiresIn: '20m' }
                    );

                    const refreshToken = jwt.sign({
                        id: result[0].id,
                        username: result[0].username,
                        email: result[0].email,
                    },
                        refreshSecretToken
                    );

                    refreshTokens.push(refreshToken);

                    response.cookie(
                        'token', accessToken, {
                        httpOnly: true,
                        maxAge: 2592000000 // 30 days in ms
                    }
                    );

                    response.cookie(
                        'refreshToken', refreshToken, {
                        httpOnly: true,
                        maxAge: 2592000000 // 30 days in ms
                    }
                    );

                    response.status(201).send({
                        'status': 201,
                        'message': 'User successfully signed in.'
                    });

                }
            }
        );
    } catch (err) {
        response.status(404).send({
            'status': 404,
            'message': err,
        });
    }
});

app.post('/api/logout', (request, response) => {
    const token = request.cookies.refreshToken;

    for (let i = 0; i < refreshTokens.length; i++) {
        if (refreshTokens[i] == token) {
            refreshTokens.splice(i, 1);
        }
    }
    console.log('200 Ok: "/api/logout"');
    response.status(201).send({
        'status': 201,
        'message': 'User successfully logged out.'
    });
});

app.post('/api/auth', authUser, (request, response) => {
    console.log('200 Ok: "/api/auth"');
    response.status(201).send({
        'status': 201,
        'message': 'User is logged in.',
        'content': request.token
    });
});

// Used to check if the requesting user is the owner of a set
app.post('/api/owner/sets', authUser, (request, response) => {
    const set_id = request.body.set_id;
    const user_id = request.user.id;
    const username = request.user.username;

    try {
        pool.query(
            "SELECT count(*) as 'count'\n" +
            "FROM sets\n" +
            "WHERE id = ? AND user_id = ?;",
            [set_id, user_id],
            (error, result) => {
                if (error) {
                    console.log('400 Bad Request: "/api/owner/sets"');
                    response.status(400).send({
                        'status': 400,
                        'message': error,
                    });
                }

                if (result[0].count < 1) {
                    console.log('403 Forbidden: "/api/owner/sets"');
                    response.status(401).send({
                        'status': 401,
                        'message': 'Must be the owner of a set to edit/delete it'
                    })
                }
                else {
                    console.log('200 Ok: "/api/owner/sets"');
                    response.status(201).send({
                        'status': 201,
                        'message': username
                    });
                }

            }
        );
    }
    catch (error) {
        console.log('404 Not Found: "/api/owner/sets"');
        response.status(404).send({
            'status': 404,
            'message': error,
        })
    }

});

app.post('/api/owner/folders', authUser, (request, response) => {
    const folder_id = request.body.folder_id;
    const user_id = request.user.id;
    const username = request.user.username;

    try {
        pool.query(
            "SELECT count(*) as 'count'\n" +
            "FROM folders\n" +
            "WHERE id = ? AND user_id = ?;",
            [folder_id, user_id],
            (error, result) => {
                if (error) {
                    console.log('400 Bad Request: "/api/owner/folders"');
                    response.status(400).send({
                        'status': 400,
                        'message': error,
                    });
                }

                if (result[0].count < 1) {
                    console.log('403 Forbidden: "/api/owner/folders"');
                    response.status(401).send({
                        'status': 401,
                        'message': 'Must be the owner of a folder to delete it'
                    })
                }
                else {
                    console.log('200 Ok: "/api/owner/folders"');
                    response.status(201).send({
                        'status': 201,
                        'message': username
                    });
                }

            }
        );
    }
    catch (error) {
        console.log('404 Not Found: "/api/owner/folders"');
        response.status(404).send({
            'status': 404,
            'message': error,
        })
    }

});

app.post('/api/owner/username', authUser, (request, response) => { 
    const requestUsername = request.user.username;
    const ownerUsername = request.body.username;

    if(requestUsername === ownerUsername) {
        console.log('200 Created: "/api/owner/username"');
        response.status(201).send({
            "status": 201,
            "content": ownerUsername,
        })
    }
    else {
        console.log('403 Forbidden: "/api/owner/username"');
        response.status(403).send({
            "status": 403,
            "content": ownerUsername,
        })
    }
    
});

app.post('/api/token', (request, response) => {
    const { token } = request.body;

    if (!token) {
        response.status(401);
    }
        

    if (!refreshTokens.includes(token)) {
        response.status(403);
    }
        

    jwt.verify(token, refreshSecretToken, (error, user) => {
        if (error) {
            response.status(403);
        }
            
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
    response.sendFile(path.join(__dirname + '/../app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});