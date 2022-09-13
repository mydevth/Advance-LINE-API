const config = require("../config/line");
const { botSendCamera } = require("./bot-user-step/1-bot-send-camera");

exports.handleMessage = async (event) => {
  let msg;

  let msgFromUser = event.message.text.trim();

  if (msgFromUser === "เริ่มการแจ้งซ่อม") {
    msg = botSendCamera();
  } else if (msgFromUser === "ยกเลิกการแจ้งซ่อม") {
    msg = { type: "text", text: "ขอบคุณที่ใช้บริการ " };
  } else {
    msg = { type: "text", text: "กรุณาแจ้งใหม่อีกครับ" };
  }

  return config.client.replyMessage(event.replyToken, msg);
};
