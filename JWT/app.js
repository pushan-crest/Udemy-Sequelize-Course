const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const appRoutes = require("./routers/user");

const app = express();
const PORT = 3000;

// =============================

app.use(bodyParser.json());

app.use("/", appRoutes);

// ================================

// listen to port
app.listen(PORT, function () {
  console.log("Server is running on port" + PORT);
});

// ================================
