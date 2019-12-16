'use strict';

const constants = require('../../constants');
const nlpDiagnosis = require('./nlp_diagnosis');
const incomingMessageUtils = require('../../Utils/MessageUtils/incoming_message_ultis');

// Find best matching pattern to  incoming message
exports.matchPattern = function(messageObject) {
	// If message is a free text
	if (messageObject.message) return handleFreeText(messageObject);
	// If message is a payload
	if (messageObject.postback) return handlePayload(messageObject);
	// Log to consloe none known message type found
	console.log('[#] Message is from unknown type.');
	// Unknown message type, return undefined
	return undefined;
};

// Handle known payloads
function handlePayload(messageObject) {
	// Log to console type of message
	console.log('[#] Message is a payload.');
	// Extract payload from message object
	const payload = incomingMessageUtils.getTextFromMessage(messageObject);
	// Find matching pattern for current payload
	if (payload === 'GET_STARTED') return require('../../Patterns/greeting_pattern');
	// No matching found, return undefined
	return undefined;
}

// Handle free text message
function handleFreeText(messageObject) {
	// Log to console type of message
	console.log('[#] Message is a free text.');
	console.log('nlp: ', messageObject.message.nlp);
	// Get intent of message
	const messageIntent = nlpDiagnosis.getIntent(messageObject);
	console.log('Intent: ', messageIntent);
	// Extract free text from message object
	const textMessage = incomingMessageUtils.getTextFromMessage(messageObject);
	// Cant understand free text intent
	return undefined;
}
