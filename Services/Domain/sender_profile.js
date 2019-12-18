const facebook = require("fb-messenger-bot-api");
const messageClient = new facebook.FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN);

exports.getSenderProfile = function(senderPsid) {
  const profileObject = messageClient
    .getUserProfile(senderPsid, [
      "first_name",
      "last_name",
      "profile_pic",
      "locale",
      "timezone",
      "gender"
    ])
    .then(result => {
      console.log("result : ", result);
    });
  console.log("Profile : ", profileObject);
};
