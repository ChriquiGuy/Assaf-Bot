'use strict';

const responseManager = require('./response_manger');
const messengerAction = require('../Utils/MessageUtils/sender_actions');
const facebook = require('fb-messenger-bot-api');
const messageClient = new facebook.FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN);

// Handles incoming messages
exports.handleIncomingMessage = function(received_message) {
	const senderID = getSenderPsidFromMessage(received_message);

	// Get response to the incoming message
	let response = responseManager.processMessage(senderID, received_message);
	if (response) {
		console.log('Response : ' + response.text);
		// Mark message as seen and wait 'x' amount of time before response back (reading time)
		messengerAction.markSeen(senderID, received_message);
		// If appropriate response found, send it to the client
		sendMessage(senderID, response);
	} else {
		// If not, transfer handling to human
		// TODO : add human handeling
		console.log('Move message handling to a human');
	}
};

// Sends response messages via the Send API (send the message {messageText} to user {sender_psid}
const sendMessage = function(sender_psid, response) {
	// Mark typing and wait 'x' amount of time before disable typing (writing time)
	messengerAction.markTyping(sender_psid, response.text);
	// Send the HTTP request to the Messenger Platform`
	messageClient.sendTextMessage(sender_psid, response.text).then((result) => {});
};

// Return sender PSID
function getSenderPsidFromMessage(message) {
	return message.sender.id;
}

// Return request body object
function createRequestBody(sender_psid, response) {
	return {
		recipient: {
			id: sender_psid
		},
		message: response
	};
}
