const express = require("express");
const router = express.Router();

const studentModel = require("../models").Student;
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtconfig = require("../JSONconfig/config");

const Op = Sequelize.Op;

// get student data using token
router.get("/students", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, jwtconfig.secret, (err, decoded) => {
    if (err) {
      res.json({
        status: 400,
        message: "Invalid token",
      });
    } else {
      studentModel
        .findAll({
          where: {
            id: decoded.id,
          },
        })
        .then((student) => {
          res.json({
            status: 200,
            message: "Student Data",
            data: student,
          });
        })
        .catch((err) => {
          res.json({
            status: 400,
            message: "Something went wrong",
          });
        });
    }
  });
});

// Login User
router.post("/login", function (req, res) {
  studentModel
    .findOne({
      where: {
        email: {
          [Op.eq]: req.body.email,
        },
      },
    })
    .then((student) => {
      if (student) {
        let password = req.body.password;
        if (bcrypt.compare(password, student.password)) {
          const token = jwt.sign(
            {
              id: student.id,
              email: student.email,
            },
            jwtconfig.secret,
            {
              expiresIn: 3600,
            }
          );
          res.json({
            status: 200,
            token: token,
          });
        } else {
          res.json({
            status: 400,
            message: "Something went wrong",
          });
        }
      } else {
        res.json({
          status: 400,
          message: "Invalid email",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// Register User
router.post("/student", function (req, res) {
  studentModel
    .findOne({
      where: {
        email: {
          [Op.eq]: req.body.email,
        },
      },
    })
    .then((result) => {
      if (result) {
        res.json({
          status: 400,
          message: "Email already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.json({
              status: 400,
              message: "Something went wrong",
            });
          } else {
            studentModel
              .create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                roll_no: req.body.roll_no,
              })
              .then((result) => {
                res.json({
                  status: 200,
                  message: "Student created successfully",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
