const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("./model");
const { jwtSecret } = require("../config/secrets");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res
        .status(201)
        .json({ message: `User with the ID of ${saved} has been registered.` });
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "There was an error with your registration request." });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);

          res.status(200).json({
            message: `Welcome ${user.username}`,
            token
          });
        } else {
          res.status(401).json({ error: "Invalid credentials." });
        }
      });
  } else {
    res
      .status(401)
      .json({ error: "Please provide valid username and password." });
  }
});

function generateToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: "30m"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
