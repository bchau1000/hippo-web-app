/* This is where the business logic goes, 
AKA dealing with the data retrieved by the connector*/
const { createToken } = require("../Middlewares/Auth/auth")
const pool = require("../Config/config");
const bcrypt = require('bcrypt');
const saltRounds = 10; // adjust how strong the hashing function is, n hashes per second

exports.registerUser = (request, response) => {
    const user = [
        request.body.username,
        bcrypt.hashSync(request.body.password, saltRounds),//hashed password
        request.body.firstName,
        request.body.lastName
    ];

    try {
        pool.query(
            "INSERT INTO users(username, password, first_name, last_name) VALUES(?, ?, ?, ?)",
            user,
            (error, _) => {
                if (error) {
                    if (error.code === 'ER_DUP_ENTRY') {
                        return response.status(401).send({
                            'status': 401,
                            'message': 'Username is already taken.'
                        });

                    }
                    else {
                        return response.status(400).send(error);
                    }
                }
                else {
                    console.log('201 Created: "/api/register"');
                    return response.status(201).send({
                        'status': 201,
                        'message': 'User successfully registered.',
                        'content': {
                            'username': request.body.username
                        },
                    });
                }
            });
    } catch (err) {
        return response.status(404).send({
            'status': 404,
            'message': err
        });
    }
};

exports.loginUser = (request, response) => {
    const {
        username,
        password
    } = request.body;

    try {
        pool
        pool.query(
            "SELECT id, username, email,password\n" +
            "FROM users\n" +
            "WHERE username = ? ",
            [username, password],
            (error, result) => {
                if (error) return next(error);

                if (result.length === 0) {
                    console.log('HERE', result);
                    return response.status(400).send({
                        'status': 400,
                        'message': 'Invalid username or password.'
                    });
                }
                else {
                    console.log('HERE2', result);
                    if (bcrypt.compareSync(password, result[0].password)) {
                        console.log('HERE3', result);
                        const accessToken = createToken(result);
                        if (accessToken !== null) {
                            response.cookie(
                                'token', accessToken, {
                                httpOnly: true,
                                maxAge: 2592000000 // 30 days in ms
                            });

                            return response.status(200).send({
                                'status': 200,
                                'content': {
                                    'username': result[0].username,
                                }
                            });
                        }

                    } else {
                        console.log('HERE4', result);
                        console.log(password);
                        return response.status(400).send({
                            'status': 400,
                            'message': 'Invalid username or password.'
                        });
                    }
                }
            }
        );
    }
    catch (err) {
        return response.status(404).send({
            'status': 404,
            'message': err,
        });
    }
}

exports.logoutUser = (request, response) => {
    response.cookie(
        'token', null
    );
    return response.status(201).send({
        'status': 201,
        'message': 'User successfully logged out.'
    });


}

exports.userIsLoggedIn = (request, response) => {
    return response.status(201).send({
        'status': 201,
        'message': 'User is logged in.',
        'content': request.token
    });
};


