const crypto = require("crypto");
const { promisify } = require("util");

const encripter = promisify(crypto.scrypt);

const encryptPassword = async (password) => {
  const encryptedPassword = await encripter(password, process.env.SALT, 32);
  console.log(encryptedPassword.toString("hex"));
  return encryptedPassword.toString("hex");
};

module.exports = encryptPassword;
