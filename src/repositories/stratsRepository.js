const { Op } = require("sequelize");
const Strat = require("../models/Strat");
const User = require("../models/User");

exports.findAllStrats = async () => {
  return await Strat.findAll({
    include: User,
  });
};

exports.findAllStratsWithUserId = async (UserId) => {
  return await Strat.findAll({
    include: User,
    where: {
      UserId,
    },
  });
};

exports.findStratByCommand = async (key, UserId) => {
  return await Strat.findAll({
    where: {
      UserId,
      key,
    },
  });
};

exports.insertNewStrat = async (strat) => {
  return await Strat.create(strat);
};

exports.updateStrat = async (id, stratDetails) => {
  return await Strat.update(stratDetails, { where: { id } });
};

exports.deleteStrat = async (id) => {
  return await Strat.destroy({ where: { id } });
};
