const JWTconfig = require("./config/jwtconfig");
const jwt = require("jsonwebtoken");

let checktoken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(
      token,
      JWTconfig.secret,
      { algorithms: JWTconfig.algorithm },
      (err, decoded) => {
        if (err) {
          res.status(403).send({
            success: false,
            message: "token invalid",
          });
        } else {
          req.user = decoded;
          next();
        }
      }
    );
  } else {
    res.status(403).send({
      success: false,
      status: 0,
      message: "token not provided",
    });
  }
};

module.exports = { checktoken: checktoken };
