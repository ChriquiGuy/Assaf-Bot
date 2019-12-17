'use strict';

// Return message text as string
exports.getTextFromMessage = function(received_message) {
	// Check if its a message
	if (received_message.message) {
		// Check if it a quick replay message
		if (received_message.message.quick_reply) {
			// Its a quick replay payload
			return received_message.message.quick_reply.payload;
		} else {
			// Its a text message
			return received_message.message.text;
		}
		// Check if it a postback message
	} else if (received_message.postback) {
		// Its a payload
		return received_message.postback.payload;
	}
};
