const Map = require("../models/Map");
const User = require("../models/User");
const Strat = require("../models/Strat");

exports.insertMap = async (map) => {
  await Map.create(map);
};

exports.findAllMaps = async (UserId) => {
  return await Map.findAll({
    where: {
      UserId,
      include: Strat,
    },
  });
};
