const userRepository = require("../repositories/userRepository");
const encryptPassword = require("../utils/encryptPassword");
const { insertUserSchema } = require("../validations/userValidation");
const { signToken } = require("./jwtService");

exports.getAllUsers = async () => {
  return userRepository.findAllUsers();
};

exports.signup = async (userData, avatar) => {
  const validationData = await insertUserSchema.validateAsync(userData); //User validation
  const encryptedPassword = await encryptPassword(validationData.password);

  await userRepository.createUser({
    ...validationData,
    password: encryptedPassword,
    avatar: avatar,
  });
};

exports.login = async (email, password) => {
  if (!email || !password) throw new Error("Invalid data provided");
  const user = await userRepository.findUserWithPasswordByEmail(email);

  if (!user) throw new Error("User not found");

  const encryptedPassword = await encryptPassword(password);
  if (user.password !== encryptedPassword) throw new Error("Wrong password");

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return token;
};

exports.removeUser = async (id) => {
  if (!id) throw new Error("User not found");
  await userRepository.deleteUser(id);
};
