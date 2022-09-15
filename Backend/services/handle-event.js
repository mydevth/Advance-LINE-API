const { handleFollow } = require("./handle-follow");
const { handleImage } = require("./handle-image");
const { handleLocation } = require("./handle-location");
const { handleMessage } = require("./handle-message");
const { handlePostback } = require("./handle-postback");
const { handleUnFollow } = require("./handle-unfollow");

// event handler
exports.handleEvent = (event) => {
  // console.log(event.message.type);
  switch (event.type) {
    case "message":
      switch (event.message.type) {
        case "text":
          handleMessage(event);
          break;
        case "image":
          // console.log("image message");
          handleImage(event);
          break;
        case "location":
          handleLocation(event);
          break;
        case "sticker":
          console.log("sticker message");
          break;
        default:
          throw new Error(
            "Unknown message " + JSON.stringify(event.message.type)
          );
      }
      break;
    case "postback":
      handlePostback(event);
      break;

    case "follow":
      handleFollow(event);
      break;

    case "unfollow":
      // console.log("มีคน block / เลิกเป็นเพื่อนแล้ว");
      handleUnFollow(event);
      break;
    default:
      throw new Error("Unknown event " + JSON.stringify(event));
  }
};
