const wait = require('wait-for-stuff');
const incomingMessageUtils = require('./incoming_message_ultis');
const facebook = require('fb-messenger-bot-api');

const messageClient = new facebook.FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN);

// Mark typing and wait 'x' amount of time before disable typing (writing time)
exports.markTyping = function(senderId, message) {
	messageClient.toggleTyping(senderId, true);
	wait.for.time(calculateWaitTime(message));
	messageClient.toggleTyping(senderId, false);
};

// Wait 'x' amount of time (reading time) and then mark message as seen
exports.markSeen = function(senderId, incomingMeassage) {
	messageClient.markSeen(senderId);
	const incomingMeassageString = incomingMessageUtils.getTextFromMessage(incomingMeassage);
	wait.for.time(calculateWaitTime(incomingMeassageString));
};

// Calaculate amount of time by text length
function calculateWaitTime(message) {
	// Get number of words in string
	const wordCount = message.split(' ').length;
	// Delay is 0.5 sec for word
	var delay = wordCount * 0.5;
	console.log('Delay : ' + delay);
	if (delay > 10) delay = 10;
	return delay;
}
