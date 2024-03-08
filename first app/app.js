const express = require("express");
const bodyParser = require("body-parser");

const appRoutes = require("./routers/user");

const app = express();

// ===================== Middlewares ===============

app.use(bodyParser.json());

app.use("/", appRoutes);

// ======================================================

//app listen
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// ===============================================================
