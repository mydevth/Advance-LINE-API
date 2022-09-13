const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const config = require("../config/line");
const { botSendLocation } = require("./bot-user-step/2-bot-send-location");
const axios = require("axios").default;

exports.handleImage = async (event) => {
  let msg;

  // console.log(event.message.id);
  const response = await axios.get(
    `https://api-data.line.me/v2/bot/message/${event.message.id}/content`,
    {
      headers: { Authorization: "Bearer " + process.env.CHANNEL_ACCESS_TOKEN },
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

  // send location quickreply button
  msg = botSendLocation()

  return config.client.replyMessage(event.replyToken, msg);
};
