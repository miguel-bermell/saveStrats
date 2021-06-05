const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");
const { VALUES } = require("../utils/constants");

const User = dbConnection.define(
  "User",
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING(200),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(64),
    },
    name: {
      type: DataTypes.STRING(200),
    },
    role: {
      type: DataTypes.STRING(20),
      defaultValue: "user",
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: VALUES.AVATAR_DEFAULT,
    },
  },
  {
    defaultScope: { attributes: { exclude: ["password"] } },
    scopes: { withPassword: { attributes: {} } },
  }
);

User.prototype.toJSON = function () {
  const attributes = Object.assign({}, this.get());
  delete attributes.password;
  return attributes;
};

module.exports = User;
