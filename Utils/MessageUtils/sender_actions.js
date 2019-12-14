const wait = require('wait-for-stuff');
const incomingMessageUtils = require('../MessageUtils/incoming_message_ultis');
const facebook = require('fb-messenger-bot-api');

const messageClient = new facebook.FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN);

exports.markTyping = function(senderPSID, message) {
	messageClient.toggleTyping(senderPSID, true);
	wait.for.time(calculateWaitTime(message));
	messageClient.toggleTyping(senderPSID, false);
};

exports.markSeen = function(senderPSID, incomingMeassage) {
	messageClient.markSeen(senderPSID);
	const incomingMeassageString = incomingMessageUtils.getTextFromMessage(incomingMeassage);
	wait.for.time(calculateWaitTime(incomingMeassageString));
};

function calculateWaitTime(message) {
	let delay = message.length / 10;
	if (delay > 7) delay = 7;
	return delay;
}
