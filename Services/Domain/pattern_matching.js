'use strict';

const constants = require('../../constants');
const nlpDiagnosis = require('./nlp_diagnosis');
const incomingMessageUtils = require('../../Utils/MessageUtils/incoming_message_ultis');

// Find best matching pattern to  incoming message
exports.matchPattern = function(message) {
	// If message is a free text
	if (message.type == 'text') return handleFreeText(message);
	// If message is a payload
	if (message.type == 'payload') return handlePayload(message);
	// Log to consloe none known message type found
	console.log('[#] Message is from unknown type.');
	// Unknown message type, return undefined
	return undefined;
};

// Handle known payloads
function handlePayload(message) {
	// Log to console type of message
	console.log('[#] Message is a payload.');
	// Extract payload from message object
	const payload = incomingMessageUtils.getTextFromMessage(message);
	// Find matching pattern for current payload
	if (payload === 'GET_STARTED') return require('../../Patterns/greeting_pattern');
	// No matching found, return undefined
	return undefined;
}

// Handle free text message
function handleFreeText(message) {
	// Log to console type of message
	console.log('[#] Message is a free text.');
	//! // Get intent of message
	// const messageIntent = nlpDiagnosis.getIntent(message);
	// console.log('Intent: ' + messageIntent.value);
	//! // Extract free text from message object
	// const textMessage = incomingMessageUtils.getTextFromMessage(message);
	// Cant understand free text intent
	return undefined;
}
