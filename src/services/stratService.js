const stratRepository = require("../repositories/stratsRepository");
const {
  insertStratSchema,
  updateStratSchema,
} = require("../validations/stratValidation");

exports.getAllStrats = async (user) => {
  const filter = user?.role === "user" || user === undefined;
  return await stratRepository.findAllStrats(filter);
};

exports.createStrat = async (strat) => {
  await insertStratSchema.validateAsync(strat);
  await stratRepository.insertNewStrat(strat);
};
