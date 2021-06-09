const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

const Map = dbConnection.define("Map", {
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

module.exports = Map;
