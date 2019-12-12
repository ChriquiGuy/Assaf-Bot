'use strict';

const request = require('request');
const flowManager = require('./flow_manger');

// Handles incoming messages
exports.handleIncomingMessage = function(received_message) {
	const senderPSID = getSenderPsidFromMessage(received_message);
	flowManager.processMessage(senderPSID, received_message);
};

// Sends response messages via the Send API (send the message {messageText} to user {sender_psid}
// if the callback function parameter exists, it runs it after the request is sent
exports.sendMessage = function callSendAPI(sender_psid, response, callback) {
	const request_body = createRequestBody(sender_psid, response);

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

function getSenderPsidFromMessage(message) {
	return message.sender.id;
}

function createRequestBody(sender_psid, response) {
	return {
		recipient: {
			id: sender_psid
		},
		message: response
	};
}
