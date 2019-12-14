const wait = require('wait-for-stuff');
const incomingMessageUtils = require('../MessageUtils/incoming_message_ultis');
const facebook = require('fb-messenger-bot-api');

const messageClient = new facebook.FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN);

exports.markTyping = function(senderID, message) {
	messageClient.toggleTyping(senderID, true);
	wait.for.time(calculateWaitTime(message));
	messageClient.toggleTyping(senderID, false);
};

exports.markSeen = function(senderID, incomingMeassage) {
	messageClient.markSeen(senderID);
	const incomingMeassageString = incomingMessageUtils.getTextFromMessage(incomingMeassage);
	wait.for.time(calculateWaitTime(incomingMeassageString));
};

function calculateWaitTime(message) {
	let delay = message.length / 10;
	if (delay > 7) delay = 7;
	return delay;
}
