const jwt = require("jsonwebtoken");

// Master access tokens for JWT, MUST CHANGE DURING DEPLOYMENT
const secretToken = "secret_token";
const refreshSecretToken = "refresh_secret_token";
const refreshTokens = [];

exports.authUser = (request, response, next) => {
  const token = request.cookies.token;
  const refreshToken = request.cookies.refreshToken;

  if (refreshTokens.includes(refreshToken)) {
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
      { expiresIn: "20m" }
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

    return [accessToken, refreshToken];
  }
  console.error("Could not establish a accessToken");
  return [null, null];
};


exports.removeToken = (token) => {
    for (let i = 0; i < refreshTokens.length; i++) {
        if (refreshTokens[i] == token) {
            refreshTokens.splice(i, 1);
            return true;
        }
    }
    return false;
}
