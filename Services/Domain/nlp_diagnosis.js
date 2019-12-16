'use strict';

const CONFIDENCE_LEVEL = 0.5;

// Returns the entitis found from nlp model in JSON format
exports.getNlpResults = function getNlpResults(messageObject) {
	if (messageObject && messageObject.message && messageObject.message.nlp) {
		const requiredNLPResults = messageObject.message.nlp;
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
exports.getEntity = function getNlpEntityByName(messageObject, entity) {
	if (messageObject && messageObject.message && messageObject.message.nlp) {
		const requiredNLPResults = messageObject.message.nlp;
		return requiredNLPResults.entities[entity];
	} else {
		console.log('Entity ' + entity + ' not found');
	}
};

// Return message intent
exports.getIntent = function getIntent(messageObject) {
	if (messageObject && messageObject.message && messageObject.message.nlp) {
		const nlp = messageObject.message.nlp;
		return nlp.entities['intent'];
	} else {
		console.log('No intent found');
	}
};
