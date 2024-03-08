const express = require("express");
const router = express.Router();
const productModel = require("../models").Product;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/products", (req, res) => {
  productModel
    .findAll({
      attributes: ["name", "description"],
      limit: 10,
      order: [["id"]],
      // we can also user where
      where: {
        id: {
          [Op.eq]: 3,
        },
      },
    })
    .then((products) => {
      if (products) {
        res.status(200).json(products);
      } else {
        res.status(404).json({ message: "No products found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
