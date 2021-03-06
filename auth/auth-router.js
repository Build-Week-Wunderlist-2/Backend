const router = require('express').Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");

router.post("/register", validateUser, (req, res) => {
  let creds = req.body;
  const rounds = process.env.HASH_ROUNDS || 4;

  const hash = bcryptjs.hashSync(creds.password, rounds);

  creds.password = hash;

  Users.add(creds)
      .then(saved => {
          const token = createToken(creds);
          res.status(201).json({ data: saved , token: token});
      })
      .catch(error => {
          res.status(500).json({ error: error.message });
          ``;
      });
});

router.post("/login", validateUser, (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
      .then(users => {
          const user = users[0];

          if (user && bcryptjs.compareSync(password, user.password)) {
              const token = createToken(user);

              res.status(200).json({ message: `Welcome ${user.username}!`, token: token, id: user.id });
          } else {
              res.status(401).json({ message: "Invalid credentials" });
          }
      })
      .catch(error => {
          res.status(500).json({ error: error.message });
      });
});

function validateUser(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    if ((username.length === 0 )) {
        res.status(400).json({message: "Please provide a username"})
    }

    else if ((password.length === 0)) {
        res.status(400).json({message: "Please provide a password"})
    }

    else {
        next();
    }

}

function createToken(user) {
  const payload = {
      username: user.username,
  }

  const secret = process.env.JWT_SECRET || 'secrettoken'

  const options = {
      expiresIn: '2h'
  }
  return jwt.sign(payload, secret, options)
}

module.exports = router;
