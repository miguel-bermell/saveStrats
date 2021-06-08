const userRepository = require("../repositories/userRepository");
const encryptPassword = require("../utils/encryptPassword");
const HttpError = require("../utils/httpError");
const { insertUserSchema } = require("../validations/userValidation");
const { signToken } = require("./jwtService");

exports.getUserProfile = async (id) => {
  const user = await userRepository.findUserById(id);
  return user.toJSON();
};

exports.getAllUsers = async () => {
  return userRepository.findAllUsers();
};

exports.signup = async (userData) => {
  const validationData = await insertUserSchema.validateAsync(userData); //User validation
  const encryptedPassword = await encryptPassword(validationData.password);

  await userRepository.createUser({
    ...validationData,
    password: encryptedPassword,
  });
};

exports.login = async (email, password) => {
  if (!email || !password) throw new HttpError(400, "Invalid data provided");
  const user = await userRepository.findUserWithPasswordByEmail(email);

  if (!user) throw new HttpError(404, "User not found");

  const encryptedPassword = await encryptPassword(password);
  if (user.password !== encryptedPassword)
    throw new HttpError(400, "Wrong password");

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return token;
};

exports.removeUser = async (id) => {
  if (!id) throw new HttpError(404, "User not found");
  await userRepository.deleteUser(id);
};
