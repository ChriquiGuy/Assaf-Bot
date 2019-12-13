'use strict';

const incomingMessageUtils = require('../Utils/MessageUtils/incoming_message_ultis');
const nlp_diagnosis = require('../Services/Domain/nlp_diagnosis');

exports.processMessage = function(senderPSID, message) {
	logMessageText(senderPSID, message);

	const requestObject = {
		psid: senderPSID,
		message: message
	};
};

function logMessageText(senderPSID, message) {
	const text = incomingMessageUtils.getTextFromMessage(message);
	console.log(`PSID: ${senderPSID}, sent a message: ${text}`);

	const diagnosis = nlp_diagnosis.analyzeNlp(message);
	const nlp_string = JSON.stringify(diagnosis, null, 4); // (Optional) beautiful indented output.
	console.log('Message diagnosis:' + nlp_string);
}
