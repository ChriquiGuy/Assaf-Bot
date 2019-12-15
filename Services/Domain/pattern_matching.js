"use strict";

const constants = require("../../constants");
const nlpDiagnosis = require("./nlp_diagnosis");

// Find best matching pattern to  incoming message
exports.matchPattern = function(message) {
  // Extract string from message object
  const messageText = message.message.text;

  // Get intent of message
  const diagnosis = nlpDiagnosis.getNlpResults(message);
  const diagnosisString = JSON.stringify(diagnosis, null, 4);
  console.log("Message diagnosis:" + diagnosisString);

  if (messageText === "GET_STARTED") {
    return require("../../Patterns/greeting_pattern");
  }

  return undefined;
};
