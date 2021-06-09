const { Op } = require("sequelize");
const Strat = require("../models/Strat");
const User = require("../models/User");

exports.findAllStrats = async () => {
  return await Strat.findAll({
    include: User,
  });
};

exports.findStratById = async (id) => {
  return await Strat.findByPk(id);
};

exports.findAllStratsWithUserId = async (UserId) => {
  return await Strat.findAll({
    include: User,
    where: {
      UserId,
    },
  });
};

exports.paginateStratsByUserId = async (UserId, { limit, offset }) => {
  return await Strat.findAndCountAll({
    where: {
      UserId,
    },
    limit,
    offset,
    order: [["updatedAt", "DESC"]],
  });
};

exports.findStratByCommand = async (key, UserId) => {
  console.log(key);
  return await Strat.findAll({
    where: {
      key,
      UserId,
    },
  });
};

exports.findStratIfExist = async (key, UserId) => {
  return await Strat.findOne({
    where: {
      key,
      UserId,
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
