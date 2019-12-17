'use strict';

const CONFIDENCE_LEVEL = 0.3;

// Returns the entitis found from nlp model in JSON format
exports.getNlpResults = function getNlpResults(messageObject) {
	if (messageObject && messageObject.message && messageObject.message.nlp) {
		const nlp = messageObject.message.nlp;
		filterUnConfident(nlp, CONFIDENCE_LEVEL);
		return nlp;
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
		const nlp = messageObject.message.nlp;
		if (nlp && nlp.entities && nlp.entities[entity]) return nlp.entities[entity][0];
	}
	return undefined;
};

// Return message intent
exports.getIntent = function getIntent(messageObject) {
	if (messageObject && messageObject.message && messageObject.message.nlp) {
		const nlp = messageObject.message.nlp;
		if (nlp && nlp.entities && nlp.entities['intent']) return nlp.entities['intent'][0];
	}
	return undefined;
};
