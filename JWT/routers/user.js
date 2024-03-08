const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWTConfig = require("../config/jwtconfig");
const JWTmiddleware = require("../jwt-middleware");

router.get("/", (req, res) => {
  res.sendStatus(200).json({
    status: 1,
    message: "Welcome to HomePage",
  });
});

// method to create a user
router.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const status = req.body.status;

  if (!name || !email || !password || !status) {
    return res.status(400).json({
      status: 0,
      message: "Please fill all the fields",
    });
  }

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((result) => {
      if (result) {
        res.status(200).json({
          status: 0,
          message: "User Already Exists",
        });
      } else {
        User.create({
          name: name,
          email: email,
          password: bcrypt.hashSync(password, 8),
          status: status,
        })
          .then((result) => {
            res.status(200).json({
              status: 1,
              message: "User Created Successfully",
              data: result,
            });
          })
          .catch((error) => {
            res.status(500).json({
              status: 0,
              message: "Internal Server Error",
              error: error,
            });
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// login route with email and password as we did earlier

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).json({
      status: 0,
      message: "Please fill all the fields",
    });
  }
  User.findOne({
    where: {
      email: email,
    },
  })
    .then((result) => {
      if (result) {
        if (bcrypt.compareSync(password, result.password)) {
          let userToken = jwt.sign(
            {
              email: result.email,
              id: result.id,
            },
            JWTConfig.secret,
            {
              // 10min is the limit
              expiresIn: JWTConfig.expiresIn,
              // after one min we can use token value
              notBefore: JWTConfig.notBefore,
              audience: JWTConfig.audience,
              algorithm: JWTConfig.algorithm,
            }
          );
          console.log(userToken);
          res.status(200).json({
            status: 1,
            message: "User Login Successfully",
            token: userToken,
          });
        } else {
          res.status(500).json({
            status: 0,
            message: "Password didnt match",
            error: err,
          });
        }
      } else {
        res.status(500).json({
          status: 0,
          message: "User not found",
          error: err,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 0,
        message: "Internal Server Error",
        error: err,
      });
    });
});

// validate token api
router.post("/validateToken", (req, res) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, JWTConfig.secret, (err, decoded) => {
      if (err) {
        res.status(401).json({
          status: 0,
          message: "Invalid Token",
          error: err,
        });
      } else {
        res.status(200).json({
          status: 1,
          message: "Valid Token",
          data: decoded,
        });
      }
    });
  }
});

// route to get user profile data

router.post("/profile", JWTmiddleware.checktoken, (req, res) => {
  res.status(200).json({
    status: 1,
    message: "Token value parsed successfully",
    data: req.user,
  });
});

module.exports = router;
