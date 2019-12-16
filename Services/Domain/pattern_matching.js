'use strict';

const constants = require('../../constants');
const nlpDiagnosis = require('./nlp_diagnosis');
const incomingMessageUtils = require('../../Utils/MessageUtils/incoming_message_ultis');

// Find best matching pattern to  incoming message
exports.matchPattern = function(message) {
	// Extract payloda from message object
	const payload = incomingMessageUtils.extractPayloadFromMessage(message);

	// If message is a payload
	if (payload) return handlePayload(payload);

	// Get intent of message
	const messageIntent = nlpDiagnosis.getIntent(message);
	console.log('messageIntent: ' + messageIntent.value);

	return undefined;
};

// Handle known payloads
function handlePayload(payload) {
	console.log('# Incoming message is a payload');
	if (payload === 'GET_STARTED') return require('../../Patterns/greeting_pattern');
	return undefined;
}
