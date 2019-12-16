'use strict';

const UNDERSCORE_SEPARATOR = '_';

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

exports.extractQuickReplyPayloadFromMessage = function(message) {
	const payload = message.message.quick_reply.payload;
	return payload.split(UNDERSCORE_SEPARATOR).pop();
};

exports.extractPayloadFromMessage = function(message) {
	return message && message.postback && message.postback.payload;
};

exports.checkIfPayload = function checkIfPayload(message) {
	return message && message.postback && message.postback.payload;
};

exports.checkIfFreeText = function checkIfFreeText(message) {
	return message && message.message && message.message.text;
};
