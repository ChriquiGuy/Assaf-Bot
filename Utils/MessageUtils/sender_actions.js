const wait = require('wait-for-stuff');
const incomingMessageUtils = require('./incoming_message_ultis');
const facebook = require('fb-messenger-bot-api');

const messageClient = new facebook.FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN);

// Mark typing and wait 'x' amount of time before disable typing (writing time)
exports.markTyping = function(senderId, message, delayTime) {
	messageClient.toggleTyping(senderId, true);
	wait.for.time(calculateWaitTime(message, delayTime));
	messageClient.toggleTyping(senderId, false);
};

// Wait 'x' amount of time (reading time) and then mark message as seen
exports.markSeen = function(senderId, incomingMeassage) {
	messageClient.markSeen(senderId);
	const incomingMeassageString = incomingMessageUtils.getTextFromMessage(incomingMeassage);
	wait.for.time(calculateWaitTime(incomingMeassageString, true));
};

// Calaculate amount of time by text length
function calculateWaitTime(message, read = undefined, delayTime) {
	console.log('Time = ', delayTime);
	// If time exiest, return time
	if (delayTime) return delayTime > 10 ? 10 : delayTime;
	// Get number of words in string
	const wordCount = message.split(' ').length;
	// Delay is 0.6(wirte)/0.3(read) sec for word
	const wordTime = read ? 0.25 : 0.4;
	// Calculate delay
	var delay = wordCount * wordTime;
	if (delay > 10) delay = 10;
	return delay;
}
