const facebook = require("fb-messenger-bot-api");
const messageClient = new facebook.FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN);

// Save to an object sender profile details
exports.getSenderProfile = async function(senderPsid) {
  messageClient
    .getUserProfile(senderPsid, [
      "first_name",
      "last_name",
      "profile_pic",
      "locale",
      "timezone",
      "gender"
    ])
    .then(profileObject => {
      console.log("profileObject : ", profileObject);
      return profileObject;
    });
};
