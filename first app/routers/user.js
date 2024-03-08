const express = require("express");
const router = express.Router();
// const Sequelize = require("sequelize");

const User = require("../models/user");
const { Sequelize } = require("sequelize");

// find all users
router.get("/", (req, res) => {
  User.findAll()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error in finding users", error: err });
    });
});

// finding where status = 1
// find all users
router.get("/active", (req, res) => {
  User.findAll({
    where: {
      status: 1,
    },
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error in finding users", error: err });
    });
});

// adding one user to the table
router.post("/user", (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    rollno: req.body.rollno,
    status: req.body.status,
  })
    .then((result) => {
      res.status(200).send({ message: "User created successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error in creating user", error: err });
    });
});

// adding multiple users
router.post("/users", (req, res) => {
  User.bulkCreate(req.body)
    .then((result) => {
      res.status(200).send({ message: "Users created successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error in creating users", error: err });
    });
});

// delete users - destroy()
router.delete("/deluser/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.status(200).send({ message: "User deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error in deleting user", error: err });
    });
});

// using raw queries
// router.get("/raw", (req, res) => {
//   // sequelize.query() is used to directly pass query
//   sequelize.query("SELECT * FROM user_tbls", {
//     type: sequelize.Querytypes.SELECT
//   })
//     .then((result) => {
//       res.status(200).json({ status: 0, message: "Users found", data: result });
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ status: 1, message: "Error in finding users", error: err });
//     });
// });

module.exports = router;
