const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const config = require("../config/line");
const { botSendLocation } = require("./bot-user-step/2-bot-send-location");
const { botSendCamera } = require("./bot-user-step/1-bot-send-camera");
const { createRepairForm } = require("./repair");
const axios = require("axios").default;

exports.handleImage = async (event) => {
  let msg;
  // console.log(event.message);

  if (event.message.imageSet === undefined) {
    // get content from line server
    const response = await axios.get(
      `https://api-data.line.me/v2/bot/message/${event.message.id}/content`,
      {
        headers: {
          Authorization: "Bearer " + process.env.CHANNEL_ACCESS_TOKEN,
        },
        responseType: "stream",
      }
    );
    // กำหนดหรือ หา image path
    const projectPath = path.resolve("./");
    const imagePath = `${projectPath}/public/upload/`;

    // สุ่มชื่อใหม่ พร้อมนาสกุล
    const newFilename = `${uuid.v4()}.jpg`;

    // เขียนไฟล์ไปยัง image path
    response.data.pipe(fs.createWriteStream(imagePath + newFilename));

    // สร้างใบแจ้งซ่อม บันทึกไปที่ตาราง repair
    const repairData = {
      created_by: event.source.userId,
      picture: newFilename,
      repair_status: 0, // 0=อยู่ระหว่างการแจ้งซ่อมยังไม่เสร็จ(default)
    };
    const repairForm = await createRepairForm(repairData);
    global.repairId = repairForm.id; // last insert id

    // send location quickreply button
    msg = botSendLocation();
    return config.client.replyMessage(event.replyToken, msg);
  } else {
    // ส่งมา >= 2 รูปขึ้นไป
    if (event.message.imageSet.index === 1) {
      let msg1 = { type: "text", text: "ส่งภาพได้ 1 รูปเท่านั้น กรุณาลองใหม่" };
      let msg2 = botSendCamera();
      let msg = [];
      msg.push(msg1);
      msg.push(msg2);

      return config.client.replyMessage(event.replyToken, msg);
    }
  }
};
