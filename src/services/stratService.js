const stratRepository = require("../repositories/stratsRepository");
const {
  insertStratSchema,
  updateStratSchema,
} = require("../validations/stratValidation");
const checkOwnership = require("../utils/checkOwnership");
const HttpError = require("../utils/httpError");

exports.getStrat = async (id) => {
  if (!id) throw new HttpError(404, "ID not found");
  const strat = await stratRepository.findStratById(id);
  return strat.toJSON();
};

exports.getPaginateUserStrats = async (user, pagination) => {
  const { limit = 10, offset = 0 } = pagination;
  const filter = user.id;

  return await stratRepository.paginateStratsByUserId(filter, {
    limit: +limit,
    offset: +offset,
  });
};

exports.getAllStrats = async (user) => {
  const filter = user?.role === "user" || user === undefined;
  return await stratRepository.findAllStrats(filter);
};

exports.getAllStratsByUserId = async ({ id }) => {
  return await stratRepository.findAllStratsWithUserId(id);
};

exports.getStratFilteredWithCommand = async ({ key }, user) => {
  console.log(user.id);
  console.log(key);
  if (user.id !== user.id || !user.id)
    throw new HttpError(400, "You can't access here");
  const userId = user.id;
  return await stratRepository.findStratByCommand(key, userId);
};

exports.createStrat = async (strat, { id: UserId }) => {
  const findCommand = await stratRepository.findStratIfExist(strat.key, UserId);

  if (findCommand) throw new HttpError(400, "Command already exist");
  const validationStrat = await insertStratSchema.validateAsync(strat);
  await stratRepository.insertNewStrat({
    ...validationStrat,
    UserId,
  });
};

exports.editStrat = async (user, stratId, stratDetails) => {
  const strat = await stratRepository.findStratById(stratId);

  if (!strat) {
    throw new HttpError(404, `No Strat found with ID: ${stratId} `);
  }

  if (!checkOwnership(strat, user)) throw new HttpError(401, "Unauthorized");

  const validationStrat = await updateStratSchema.validateAsync(stratDetails);

  await stratRepository.updateStrat(stratId, validationStrat);
};

exports.removeStrat = async (stratId, user) => {
  const strat = await stratRepository.findStratById(stratId);

  if (!strat) {
    throw new Error(`Strat with ID: ${stratId} Not found`);
  }
  if (!checkOwnership(strat, user)) throw new HttpError(401, "Unauthorized");
  await stratRepository.deleteStrat(stratId);
};
