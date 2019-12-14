'use strict';

const incomingMessageUtils = require('../Utils/MessageUtils/incoming_message_ultis');
const nlpDiagnosis = require('../Services/Domain/nlp_diagnosis');
const patternMatching = require('../Services/Domain/pattern_matching');
const outgoingMessageUtils = require('../Utils/MessageUtils/outgoing_message_ultis');

/*
Check to which pattern incoming message belong to
Then return the appropriate response to the message
*/
exports.processMessage = function(senderId, message) {
	const messageText = incomingMessageUtils.getTextFromMessage(message);
	logMessageText(senderId, messageText);

	// Find to which pattern the incoming message belong to
	const pattern = patternMatching.matchPattern(messageText);
	// Didnt find matching pattern
	if (pattern == undefined) return undefined;
	// Get the response to an message from specific pattern
	const response = pattern.getResponse(messageText);
	return response;
};

// Log to console the incoming message
function logMessageText(senderId, message) {
	console.log(`Incoming message from PSID: ${senderId}.\nMessage: ${message}.`);
}
