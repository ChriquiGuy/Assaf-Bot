'use strict';

const responseManager = require('./response_manger');
const messengerAction = require('../Utils/MessageUtils/sender_actions');
const facebook = require('fb-messenger-bot-api');
const messageClient = new facebook.FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN);

// Handles incoming messages
exports.handleIncomingMessage = function(received_message) {
	const senderId = received_message.sender.id;

	// Get response to the incoming message
	let response = responseManager.processMessage(senderId, received_message);
	if (response) {
		console.log('Response : ' + response);
		// Mark message as seen and wait 'x' amount of time before response back (reading time)
		messengerAction.markSeen(senderId, received_message);
		// If appropriate response found, send it to the client
		sendMessage(senderId, response);
	} else {
		// If not, transfer handling to human
		// TODO : add human handeling
		console.log('Move message handling to a human');
	}
};

// Sends response messages via the Send API (send the message {messageText} to user {sender_psid}
const sendMessage = function(sender_psid, response) {
	// Mark typing and wait 'x' amount of time before disable typing (writing time)
	messengerAction.markTyping(sender_psid, response);
	// Send the HTTP request to the Messenger Platform`
	messageClient.sendTextMessage(sender_psid, response).then((result) => {});
};
