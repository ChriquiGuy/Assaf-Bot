'use strict';

const incomingMessageUtils = require('../Utils/MessageUtils/incoming_message_ultis');
const nlpDiagnosis = require('../Services/Domain/nlp_diagnosis');
const patternMatching = require('../Services/Domain/pattern_matching');

// Check to which pattern incoming message belong to
// Then return the appropriate response to the message
exports.processMessage = function(senderPSID, message) {
	const messageText = incomingMessageUtils.getTextFromMessage(message);
	logMessageText(senderPSID, messageText);

	const requestObject = {
		psid: senderPSID,
		message: message
	};
	// Find to which pattern the incoming message belong to
	const pattern = patternMatching.matchPattern(messageText);
	// Get the response to an message from specific pattern
	const response = pattern.getResponse(messageText);

	return response;
};

// Log to console the incoming message
function logMessageText(senderPSID, message) {
	console.log(`Incoming message from PSID: ${senderPSID}.\nMessage: ${message}.`);
	// const diagnosis = nlpDiagnosis.analyzeNlp(message);
	// const message_diagnosis = JSON.stringify(diagnosis, null, 4);
	// console.log('Message diagnosis:' + message_diagnosis);
}
