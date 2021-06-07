/* This is where the business logic goes, 
AKA dealing with the data retrieved by the connector*/ 
const {createToken,removeToken} = require("../Middlewares/Auth/auth")
const pool = require("../Config/config");
  
exports.registerUser = (request, response) => {
    const user = [request.body.username, request.body.password,
    request.body.firstName, request.body.lastName];

    try {
        pool.query(
            "INSERT INTO users(username, password, first_name, last_name) VALUES(?, ?, ?, ?)",
            user,
            (error, result) => {
                if (error) {
                    if (error.code === 'ER_DUP_ENTRY') {
                        return response.status(401).send({
                            'status': 401,
                            'message': 'Username is already taken.'
                        });

                    }
                    else
                        return response.status(400).send(error);
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
        pool.query(
            "SELECT id, username, email\n" +
            "FROM users\n" +
            "WHERE username = ? AND password = ?",
            [username, password],
            (error, result) => {
                if (error) return next(error);

                if (result.length === 0) {
                    return response.status(400).send({
                        'status': 400,
                        'message': 'Invalid username or password.'
                    });  
                }
                else {
                    [accessToken,refreshToken] = createToken(result);
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

                    return response.status(200).send({
                        'status': 200,
                        'content': {
                            'username': result[0].username,
                        }
                    });

                }
            }
        );
    } catch (err) {
        console.log(err)
        return response.status(404).send({
            'status': 404,
            'message': err,
        });
    }
}

exports.logoutUser = (request, response) => {
    
    if(removeToken(request.cookies.refreshToken))
    {
        console.log('200 Ok: "/api/logout"');
        return response.status(201).send({
            'status': 201,
            'message': 'User successfully logged out.'
        });
    }
   else{
       console.error('Could not logout succesfully');
   }

}

exports.userIsLoggedIn = (request, response) => {
    return response.status(201).send({
        'status': 201,
        'message': 'User is logged in.',
        'content': request.token
    });
};


