const wait = require('wait-for-stuff');
const incomingMessageUtils = require('../MessageUtils/incoming_message_ultis');
const facebook = require('fb-messenger-bot-api');

const messageClient = new facebook.FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN);

// Mark typing and wait 'x' amount of time before disable typing (writing time)
exports.markTyping = function(senderID, message) {
	messageClient.toggleTyping(senderID, true);
	wait.for.time(calculateWaitTime(message));
	messageClient.toggleTyping(senderID, false);
};

// Wait 'x' amount of time (reading time) and then mark message as seen
exports.markSeen = function(senderID, incomingMeassage) {
	messageClient.markSeen(senderID);
	const incomingMeassageString = incomingMessageUtils.getTextFromMessage(incomingMeassage);
	wait.for.time(calculateWaitTime(incomingMeassageString));
};

// Calaculate amount of time by text length
function calculateWaitTime(message) {
	let delay = message.length / 10;
	if (delay > 7) delay = 7;
	return delay;
}
