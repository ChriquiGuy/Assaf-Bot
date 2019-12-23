'use strict';

const patternMatching = require('../Services/Domain/pattern_matching');

/*
	Check to which action outgoing respones belong to
	Then execute the appropriate action
*/
exports.matchResponse = function(messageObject) {
	// Find to which pattern the incoming message belong to
	const pattern = patternMatching.matchPattern(messageObject);
	// Didnt find matching pattern
	if (pattern == undefined) return undefined;
	// Get the response to an message from specific pattern
	const response = pattern.getResponse(messageObject);
	return response;
};
