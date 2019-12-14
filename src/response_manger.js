'use strict';

const incomingMessageUtils = require('../Utils/MessageUtils/incoming_message_ultis');
const nlpDiagnosis = require('../Services/Domain/nlp_diagnosis');
const patternMatching = require('../Services/Domain/pattern_matching');

// Check to which pattern incoming message belong to
// Then return the appropriate response to the message
exports.processMessage = function(senderPSID, message) {
	const messageText = incomingMessageUtils.getTextFromMessage(message);
	console.log(`Incoming message from PSID: ${senderPSID}.\nMessage: ${messageText}.`);

	const requestObject = {
		psid: senderPSID,
		message: message
	};

	// Find to which pattern the incoming message belong to
	const pattern = patternMatching.matchPattern(message);
	// Get the response to an message from specific pattern
	const response = pattern.getResponse(message);

	logMessageText(senderPSID, message, response);
	return response;
};

// Log to console the message and the response to it
function logMessageText(senderPSID, message, response) {
	const messageText = incomingMessageUtils.getTextFromMessage(message);
	console.log(`Incoming message from PSID: ${senderPSID}.\nMessage: ${messageText}.\nResponse: ${response}`);
	// const diagnosis = nlpDiagnosis.analyzeNlp(message);
	// const message_diagnosis = JSON.stringify(diagnosis, null, 4);
	// console.log('Message diagnosis:' + message_diagnosis);
}
