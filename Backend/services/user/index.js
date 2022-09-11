const User = require("../../models/user");

exports.createUser = async (userId, displayName, pictureUrl) => {
  return await User.create({
    user_id: userId,
    display_name: displayName,
    picture_url: pictureUrl,
  });
};

exports.isUserExist = async (userId) => {
  return await User.findOne({ where: { user_id: userId } });
};

exports.removeUserById = async (userId) => {
  return await User.destroy({ where: { user_id: userId } });
};

exports.updateUser = async (userId, isActive, displayName, pictureUrl) => {
  return await User.update(
    {
      is_active: isActive,
      display_name: displayName,
      picture_url: pictureUrl,
    },
    {
      where: { user_id: userId },
    }
  );
};

exports.updateIsActiveUser = async (userId, isActive) => {
  return await User.update(
    {
      is_active: isActive,
    },
    {
      where: { user_id: userId },
    }
  );
};
