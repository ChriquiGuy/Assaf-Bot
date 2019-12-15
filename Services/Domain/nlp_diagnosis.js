"use strict";

const CONFIDENCE_LEVEL = 0.5;

// Returns the entitis found from nlp model in JSON format
exports.getNlpResults = function getNlpResults(message) {
  if (message && message.message && message.message.nlp) {
    const requiredNLPResults = message.message.nlp;
    filterUnConfident(requiredNLPResults, CONFIDENCE_LEVEL);

    // Log nlp diagnosis
    const diagnosisString = JSON.stringify(requiredNLPResults, null, 4);
    console.log("Message diagnosis:" + diagnosisString);

    return requiredNLPResults;
  }
};

// Remove entitis with less then 'limit' confidence
function filterUnConfident(nlpEntitiesArray, limit) {
  if (Array.isArray(nlpEntitiesArray) && nlpEntitiesArray.length > 0) {
    nlpEntitiesArray.filter(nlpEntity => {
      return nlpEntity.confidence >= limit;
    });
  }
}

// Return entity data by a given name
exports.getEntity = function getNlpEntityByName(message, entity) {
  return message && message.entities && message.entities[entity];
};

// Return message intent
exports.getIntent = function getIntent(message) {
  return message && message.entities && message.entities["intent"];
};
