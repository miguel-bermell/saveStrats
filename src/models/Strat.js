const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

const Strat = dbConnection.define("Strat", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  key: {
    type: DataTypes.STRING(35),
    unique: true,
  },
  content: {
    type: DataTypes.STRING,
  },
});

module.exports = Strat;
