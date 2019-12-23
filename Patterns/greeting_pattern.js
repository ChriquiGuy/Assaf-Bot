'use strict';
const staticRespones = require('../Utils/MessageUtils/Templates/Static/respones_templates');

// Get the best matching response to the message
exports.getResponse = function() {
	return staticRespones.WelcomeMessage;
};
