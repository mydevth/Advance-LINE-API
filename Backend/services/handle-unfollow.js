const userService = require("./user/index");

exports.handleUnFollow = async (event) => {
  const userId = event.source.userId;
  // console.log("user_id Unfollow/Block:", userId);
  const isExist = await userService.isUserExist(userId);
  if (isExist) {
    // await userService.removeUserById(userId);
    await userService.updateIsActiveUser(userId, 0); // user unfollow , set active = 0
  }
};
