const express = require("express");
const router = express.Router();
const service = require("../services/user/index");

// localhost:4000/user/getuserphonenumber/:id
router.get("/getuserphonenumber/:id", async function (req, res, next) {
  const user = await service.getUserPhoneNumber(req.params.id);
  return res.status(200).json({ user_phone: user.user_phone });
});

// http://localhost:4000/update/:id
router.put("/update/:id", async function (req, res, next) {
  const body = req.body;
  const user = await service.updateUser(
    req.params.id,
    1,
    body.displayName,
    body.pictureUrl,
    body.userPhone
  );

  return res.status(200).json({ message: "แก้ไขข้อมูลสำเร็จ" });
});

module.exports = router;
