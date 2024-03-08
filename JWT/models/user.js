const Sequelize = require("sequelize");

// =======================================================

const sequelize = new Sequelize("orm_jwt", "root", "Computer123", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then((data) => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.log("Error: " + error);
  });

// =======================================================

const User = sequelize.define(
  "user_tbls",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    modelName: "User",
  }
);

User.sync();

// ==============================================================

module.exports = User;
