const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

const Avatar = dbConnection.define("Avatar", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  path: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = Avatar;
