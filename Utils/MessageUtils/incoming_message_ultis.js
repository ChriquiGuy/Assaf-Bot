'use strict';

const UNDERSCORE_SEPARATOR = '_';

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
	if (message && message.message) if (message.postback) return true;
	return false;
};

// Return 'true' if incoming message is free text
exports.checkIfFreeText = function checkIfFreeText(message) {
	if (message && message.message) if (!message.message.quick_reply) return true;
	return false;
};
