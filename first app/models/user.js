const Sequelize = require("sequelize");

// ===============================================================

// initiate the connection
const sequelize = new Sequelize("node_orm", "root", "Computer123", {
  host: "localhost",
  dialect: "mysql",
});

// authentuicate sequelize connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// =============================================================

// defining model for User with tablename: 'user_tbl' and fields id, name, email, rollno, status

// const User = sequelize.define(
//   "user_tbl",
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     rollno: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//     },
//     status: {
//       type: Sequelize.ENUM("1", "0"),
//       defaultValue: "1",
//     },
//     createdAt: {
//       type: Sequelize.DATE,
//       defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
//     },
//     updatedAt: {
//       type: Sequelize.DATE,
//       defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
//     },
//   },
//   { modelName: "User", timestamp: false }
// );
// sequelize.sync();

// Other method to create a new table
const Model = Sequelize.Model;

class User extends Model {}

User.init(
  {
    // parameters
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rollno: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("1", "0"),
      defaultValue: "1",
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false,
    modelName: "user_tbl",
    sequelize,
  }
);

// this method will sync all the models with the database
sequelize.sync();

module.exports = User;
