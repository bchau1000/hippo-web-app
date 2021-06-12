const jwt = require("jsonwebtoken");

// Master access tokens for JWT, MUST CHANGE DURING DEPLOYMENT
const secretToken = "secret_token";

exports.authUser = (request, response, next) => {
  const token = request.cookies.token;
    
  if (token !== null) {
    jwt.verify(token, secretToken, (err, user) => {
        if (err) return response.sendStatus(403);

        request.token = token;
        request.user = user;
        next();
    });
  } else {
    response.status(404).send({
      status: 404,
      message: "Refresh token already expired.",
    });
  }
};

exports.createToken = (result) => {
    if (result) {
        const accessToken = jwt.sign(
            {
                id: result[0].id,
                username: result[0].username,
                email: result[0].email,
            },
            secretToken,
            { 
                expiresIn: "7d" 
            }
        );

        return accessToken;
    }
    
    return null;
};
