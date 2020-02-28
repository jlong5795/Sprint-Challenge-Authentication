const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secrets");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const secret = jwtSecret;

  if (authorization) {
    jwt.verify(authorization, secret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ you: "shall not pass!" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  }
};
