const express = require("express");
const app = express();
const studentrouter = require("./routes/product");
const approuter = require("./routes/student");
const bodyparser = require("body-parser");

const port = 3000;

app.use(bodyparser.json());
app.use("/", approuter);
app.use("/", studentrouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
