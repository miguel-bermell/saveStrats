const Avatar = require("../models/Avatar");
const User = require("../models/User");

exports.insertAvatar = async (avatar) => {
  await Avatar.create(avatar);
};

exports.findAllAvatars = async () => {
  return await Avatar.findAll({
    include: User,
  });
};
