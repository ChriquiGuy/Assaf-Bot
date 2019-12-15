"use strict";

const patternMatching = require("../Services/Domain/pattern_matching");

/*
	Check to which pattern incoming message belong to
	Then return the appropriate response to the message
*/
exports.matchResponse = function(senderId, message) {
  // Log incoming message
  console.log(`Incoming message from PSID: ${senderId}.\nMessage: ${message.message.text}.`);
  // Find to which pattern the incoming message belong to
  const pattern = patternMatching.matchPattern(message);
  // Didnt find matching pattern
  if (pattern == undefined) return undefined;
  // Get the response to an message from specific pattern
  const response = pattern.getResponse(messageText);
  return response;
};
