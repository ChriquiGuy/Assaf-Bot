'use strict';

const UNDERSCORE_SEPARATOR = '_';
const PAYLOAD = 'PAYLOAD';

// Return message text as string
exports.getTextFromMessage = function(received_message) {
	if (received_message.message) {
		if (received_message.message.quick_reply) {
			return received_message.message.quick_reply.payload;
		} else {
			return received_message.message.text;
		}
	} else if (received_message.postback) {
		return received_message.postback.payload;
	}
};

// Return 'true' if incoming message is payload
exports.checkIfPayload = function checkIfPayload(message) {
	if (message && message.postback && message.postback.payload) return true;
	return false;
};

// Return 'true' if incoming message is free text
exports.checkIfFreeText = function checkIfFreeText(message) {
	if (message && message.message && !message.message.quick_reply && !message.postback) return true;
	return false;
};
