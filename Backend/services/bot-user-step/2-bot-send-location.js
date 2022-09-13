exports.botSendLocation = () => {
  let msg = [
    {
      type: "text",
      text: "กรุณาส่ง Location ครับ",
      quickReply: {
        items: [
          {
            type: "action",
            imageUrl: "https://codingthailand.com/site/img/location.png",
            action: {
              type: "location",
              label: "ส่ง Location",
            },
          },
          {
            type: "action",
            imageUrl: "https://codingthailand.com/site/img/camera_roll.png",
            action: {
              type: "cameraRoll",
              label: "ภาพจากอัลบั้ม",
            },
          },
        ],
      },
    },
  ];
  return msg;
};
