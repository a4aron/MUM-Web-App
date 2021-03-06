const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post(
  "/signup",
  (req, res, next) => {
    var email = req.body.email;
    var splitted = email.match("^(.+)@mum.com$");
    if (splitted == null) {
      res.status(500).json({
        error: "Email not MUM"
      });
    }
    next();
  },
  (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "User created!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Invalid authentication credentials!"
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        message: "Some Problem occurred !"
      });
    });
  });

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password); //returns a promise
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_zxcl[aienzssdoa032n21@@#$(lmklhbhjbosddeuzxlw",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

module.exports = router;
