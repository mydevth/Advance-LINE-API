const { client } = require("../config/line");
const userService = require("./user/index");

exports.handleFollow = async (event) => {
  const userId = event.source.userId;
  // console.log("user_id follow/unblock:", userId);

  // get user profile
  const profile = await client.getProfile(userId);
  // console.log(profile)

  // insert profile to users table
  const isExist = await userService.isUserExist(userId);
  if (!isExist) {
    // ถ้าไม่มี user ให้เพิ่ม
    await userService.createUser(
      profile.userId,
      profile.displayName,
      profile.pictureUrl
    );
  } else {
    // ถ้ามีแล้ว ให้ update
    await userService.updateUser(
      profile.userId,
      1,
      profile.displayName,
      profile.pictureUrl
    );
  }
};
