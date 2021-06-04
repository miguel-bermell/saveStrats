const { databaseVersion } = require("../config/db");
const stratRepository = require("../repositories/stratsRepository");
const {
  insertStratSchema,
  updateStratSchema,
} = require("../validations/stratValidation");

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
  if (user.id !== user.id) throw new Error("You can't access here");
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
