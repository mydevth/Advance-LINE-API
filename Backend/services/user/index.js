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

exports.updateUser = async (userId, isActive, displayName, pictureUrl, userPhone) => {
  return await User.update(
    {
      is_active: isActive,
      display_name: displayName,
      picture_url: pictureUrl,
      user_phone: userPhone
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

exports.getUserPhoneNumber = async (userId) => {
  return await User.findOne({ where: { user_id: userId } });
  //return await User.findByPk(userId); แต่ใน db userid ไม่ได้เป็น pk จึงใช้ไม่ได้
};
