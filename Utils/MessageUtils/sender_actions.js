const request = require('request');
const wait = require('wait-for-stuff');
const incomingMessageUtils = require('../MessageUtils/incoming_message_ultis');
const facebook = require('fb-messenger-bot-api');

const messageClient = new facebook.FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN);

exports.markTyping = function(senderPSID, message) {
	messageClient.toggleTyping(senderId, true);
	// runAction(senderPSID, 'typing_on');
	// wait.for.time(calculateWaitTime(message));
	// runAction(senderPSID, 'typing_off');
};

exports.markSeen = function(senderPSID, incomingMeassage) {
	messageClient.markSeen(senderPSID);
	// runAction(senderPSID, 'mark_seen');
	// const incomingMeassageString = incomingMessageUtils.getTextFromMessage(incomingMeassage);
	// wait.for.time(calculateWaitTime(incomingMeassageString));
};

function calculateWaitTime(message) {
	return message.length / 3;
}

function runAction(senderPSID, action) {
	var headers = {
		'Content-Type': 'application/json'
	};

	var dataString = {
		recipient: {
			id: senderPSID
		},
		sender_action: action
	};

	var options = {
		url: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + process.env.PAGE_ACCESS_TOKEN,
		method: 'POST',
		headers: headers,
		body: dataString
	};

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(body);
		}
	}
	request(options, callback);
}
