const config = require("../config/line");
const { botSendCamera } = require("./bot-user-step/1-bot-send-camera");
const {
  deleteImageWhenUnCompleted,
  deleteRepairFormUnCompleted,
} = require("./repair");

const { sendRepairFormUser } = require("./send-repairform-user");

exports.handleMessage = async (event) => {
  let msg;

  let msgFromUser = event.message.text.trim();

  if (msgFromUser === "เริ่มการแจ้งซ่อม") {
    await deleteImageWhenUnCompleted(event.source.userId);
    await deleteRepairFormUnCompleted(event.source.userId);

    msg = botSendCamera();
  } else if (msgFromUser === "ยกเลิกการแจ้งซ่อม") {
    await deleteImageWhenUnCompleted(event.source.userId);
    await deleteRepairFormUnCompleted(event.source.userId);
    msg = { type: "text", text: "ขอบคุณที่ใช้บริการ " };
  } else if (msgFromUser === "ใบแจ้งซ่อมของฉัน") {
    msg = await sendRepairFormUser(event);
  } else {
    msg = { type: "text", text: "กรุณาแจ้งใหม่อีกครับ" };
  }

  return config.client.replyMessage(event.replyToken, msg);
};
