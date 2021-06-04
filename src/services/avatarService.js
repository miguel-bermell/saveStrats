const avatarRepository = require("../repositories/avatarRepository");

exports.getAllAvatars = async () => {
  return await avatarRepository.findAllAvatars();
};

exports.createAvatar = async (avatar, user) => {
  const userId = user.id;
  await avatarRepository.insertAvatar({
    ...avatar,
    UserId: userId,
  });
};
