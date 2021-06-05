const { databaseVersion } = require("../config/db");
const stratRepository = require("../repositories/stratsRepository");
const {
  insertStratSchema,
  updateStratSchema,
} = require("../validations/stratValidation");
const checkOwnership = require("../utils/checkOwnership");

exports.getStrat = async (id) => {
  if (!id) throw new Error("ID not found");
  const strat = await stratRepository.findStratById(id);
  return strat.toJSON();
};

exports.getPaginateUserStrats = async (user, pagination) => {
  const { limit = 10, offset = 0 } = pagination;
  const filter = user?.role === "user" || user === undefined;

  return await stratRepository.paginateStratsByUserId(filter, {
    limit: +limit,
    offset: +offset,
  });
};

exports.getAllStrats = async (user) => {
  const filter = user?.role === "user" || user === undefined;
  return await stratRepository.findAllStrats(filter);
};

exports.getAllStratsByUserId = async (user) => {
  if (user.id !== user.id) throw new Error("You can't access here");
  const filter = user.id;
  console.log(filter);
  return await stratRepository.findAllStratsWithUserId(filter);
};

exports.getStratFilteredWithCommand = async ({ key }, user) => {
  console.log(user.id);
  console.log(key);
  if (user.id !== user.id || !user.id) throw new Error("You can't access here");
  const userId = user.id;
  return await stratRepository.findStratByCommand(key, userId);
};

exports.createStrat = async (strat, user) => {
  const userId = user.id;
  console.log(userId);
  const validationStrat = await insertStratSchema.validateAsync(strat);
  await stratRepository.insertNewStrat({
    ...validationStrat,
    UserId: userId,
  });
};

exports.editStrat = async (user, stratId, stratDetails) => {
  const strat = await stratRepository.findStratById(stratId);

  if (!strat) {
    throw new Error(`No Strat found with ID: ${stratId} `);
  }

  if (!checkOwnership(strat, user)) throw new Error("Unauthorized");

  const validationStrat = await updateStratSchema.validateAsync(stratDetails);

  await stratRepository.updateStrat(stratId, validationStrat);
};

exports.removeStrat = async (stratId, user) => {
  const strat = await stratRepository.findStratById(stratId);

  if (!strat) {
    throw new Error(`Strat with ID: ${stratId} Not found`);
  }
  if (!checkOwnership(strat, user)) throw new Error("Unauthorized");
  await stratRepository.deleteStrat(stratId);
};
