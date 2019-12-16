'use strict';

const CONFIDENCE_LEVEL = 0.5;

// Returns the entitis found from nlp model in JSON format
exports.getNlpResults = function getNlpResults(message) {
	if (message && message.message && message.message.nlp) {
		const requiredNLPResults = message.message.nlp;
		filterUnConfident(requiredNLPResults, CONFIDENCE_LEVEL);
		return requiredNLPResults;
	}
};

// Remove entitis with less then 'limit' confidence
function filterUnConfident(nlpEntitiesArray, limit) {
	if (Array.isArray(nlpEntitiesArray) && nlpEntitiesArray.length > 0) {
		nlpEntitiesArray.filter((nlpEntity) => {
			return nlpEntity.confidence >= limit;
		});
	}
}

// Return entity data by a given name
exports.getEntity = function getNlpEntityByName(message, entity) {
	if (message && message.message && message.message.nlp) {
		const requiredNLPResults = message.message.nlp;
		return requiredNLPResults.entities[entity][0];
	} else {
		console.log('Entity ' + entity + ' not found');
	}
};

// Return message intent
exports.getIntent = function getIntent(message) {
	if (message && message.message && message.message.nlp) {
		const requiredNLPResults = message.message.nlp;
		return requiredNLPResults.entities['intent'][0];
	} else {
		console.log('No intent found');
	}
};
