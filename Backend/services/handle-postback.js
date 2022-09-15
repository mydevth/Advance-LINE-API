const { client } = require("../config/line");
const {
  botSendRepairDetail,
} = require("./bot-user-step/3-bot-send-repair-detail");
const { updateRepairFrom } = require("./repair/index");
const { updateIsActiveUser } = require("./user");

exports.handlePostback = async (event) => {
  let repairDetail = event.postback.data;

  // console.log(repairDetail);

  //update lat ,login to repair table
  const repairData = {
    detail: repairDetail,
    repair_status: 1, // 1 = แจ้งสำเร็จ
  };
  await updateRepairFrom(global.repairId, repairData);

  //send repair detail
  let msg = { type: "text", text: "ได้รับใบแจ้งเรียบร้อย" };

  return client.replyMessage(event.replyToken, msg);
};
