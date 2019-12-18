const facebook = require("fb-messenger-bot-api");
const messageClient = new facebook.FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN);

exports.getSenderProfile = function(senderPsid) {
  const profileObject = messageClient
    .getUserProfile(senderPsid, [
      first_name,
      last_name,
      profile_pic,
      locale,
      timezone,
      gender,
      is_payment_enabled,
      last_ad_referral
    ])
    .then(result => {
      console.log("Profile : ", profileObject);
      console.log("result : ", result);
    });
};
