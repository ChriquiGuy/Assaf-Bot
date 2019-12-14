'use strict';

const incomingMessageUtils = require('../Utils/MessageUtils/incoming_message_ultis');
const nlpDiagnosis = require('../Services/Domain/nlp_diagnosis');
const patternMatching = require('../Services/Domain/pattern_matching');
const outgoingMessageUtils = require('../Utils/MessageUtils/outgoing_message_ultis');

// Check to which pattern incoming message belong to
// Then return the appropriate response to the message
exports.processMessage = function(senderID, message) {
	const messageText = incomingMessageUtils.getTextFromMessage(message);
	logMessageText(senderID, messageText);

	const requestObject = {
		psid: senderID,
		message: message
	};
	// Find to which pattern the incoming message belong to
	const pattern = patternMatching.matchPattern(messageText);
	// Didnt find matching pattern
	if (pattern == undefined) return undefined;
	// Get the response to an message from specific pattern
	const response = pattern.getResponse(messageText);
	const responseObject = outgoingMessageUtils.createTextMessageResponseObjectFromText(response);
	return responseObject;
};

// Log to console the incoming message
function logMessageText(senderID, message) {
	console.log(`Incoming message from PSID: ${senderID}.\nMessage: ${message}.`);
	// const diagnosis = nlpDiagnosis.analyzeNlp(message);
	// const message_diagnosis = JSON.stringify(diagnosis, null, 4);
	// console.log('Message diagnosis:' + message_diagnosis);
}
