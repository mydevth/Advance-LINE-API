exports.botSendRepairDetail = () => {
  let items = [];

  let repairDetail = [
    "เปิดไม่ติด",
    "projector ไม่ออก",
    "ไมค์ไม่ดัง",
    "คอมพิวเตอร์ไม่ติด",
    "อินเตอร์เน็ตใช้ไม่ได้",
    "แอร์ไม่เย็น",
    "ไฟดับ",
  ];

  items = repairDetail.map((item) => {
    return {
      type: "action",
      action: {
        type: "postback",
        label: item,
        data: item,
      },
    };
  });

  let msg = {
    type: "text",
    text: "กรุณาแจ้งอาการเสีย",
    quickReply: {
      items: items,
    },
  };

  return msg;
};
