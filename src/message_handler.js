'use strict';

const request = require('request');
const responseManager = require('./response_manger');
const messengerAction = require('../Utils/MessageUtils/sender_actions');

// Handles incoming messages
exports.handleIncomingMessage = function(received_message) {
	const senderPSID = getSenderPsidFromMessage(received_message);

	// Get response to the incoming message
	let response = responseManager.processMessage(senderPSID, received_message);
	if (response) {
		console.log('Response : ' + response.text);
		// Mark message as seen and wait 'x' amount of time before response back (reading time)
		messengerAction.markSeen(senderPSID, received_message);
		// If appropriate response found, send it to the client
		sendMessage(senderPSID, response);
	} else {
		// If not, transfer handling to human
		// TODO : add human handeling
		console.log('Move message handling to a human');
	}
};

// Sends response messages via the Send API (send the message {messageText} to user {sender_psid}
// if the callback function parameter exists, it runs it after the request is sent
const sendMessage = function callSendAPI(sender_psid, response, callback) {
	const request_body = createRequestBody(sender_psid, response);
	console.log('Return: ' + response.text);

	// messengerAction.markTyping(sender_psid, response.text);

	// Send the HTTP request to the Messenger Platform`
	request(
		{
			uri: 'https://graph.facebook.com/v2.6/me/messages',
			qs: {
				access_token: process.env.PAGE_ACCESS_TOKEN
			},
			method: 'POST',
			json: request_body
		},
		(err, res, body) => {
			if (!err) {
				console.log(`Sending a message back to psid ${sender_psid}.`);
			} else {
				console.error('Unable to send message: ' + err);
			}
		}
	);
	if (callback) {
		callback();
	}
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
