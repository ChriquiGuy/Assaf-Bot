"use strict";

const constants = require("../../constants");
const nlpDiagnosis = require("./nlp_diagnosis");

// Find best matching pattern to  incoming message
exports.matchPattern = function(message) {
  // Get intent of message
  const diagnosis = nlpDiagnosis.getNlpResults(message);
  const diagnosisString = JSON.stringify(diagnosis, null, 4);
  console.log("Message diagnosis:" + diagnosisString);

  //   switch (key) {
  //     case value:
  //       break;

  //     default:
  //       break;
  //   }

  if (message === "GET_STARTED") {
    return require("../../Patterns/greeting_pattern");
  }

  return undefined;
};
