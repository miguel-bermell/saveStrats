const dbConnection = require("../config/db");
const User = require("./User");
const Strat = require("./Strat");

const loadModels = () => {
  User.hasMany(Strat, {
    foreignKey: {
      allowNull: false,
    },
  });
  Strat.belongsTo(User);
  dbConnection.sync({}).then(() => console.log("All models loaded"));
};

module.exports = loadModels;
