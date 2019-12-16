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
