"use strict";

const CONFIDENCE_LEVEL = 0.5;

// Returns the entitis found from nlp model in JSON format
exports.analyzeNlp = function getNlpResults(message) {
  if (message && message.message && message.message.nlp) {
    const requiredNLPResults = message.message.nlp;
    filterUnConfident(requiredNLPResults, CONFIDENCE_LEVEL);
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
function getNlpEntityByName(nlp, name) {
  return nlp && nlp.entities && nlp.entities[name];
}
