'use strict';

const CONFIDENCE_LEVEL = 0.5;

exports.analyzeNlp = function getNlpResults(message) {
	if (message && message.message && message.message.nlp) {
		const requiredNLPResults = message.message.nlp;
		filterUnConfident(requiredNLPResults, CONFIDENCE_LEVEL);
		return requiredNLPResults;
	}
};

function filterUnconfident(nlpEntitiesArray, limit) {
	if (Array.isArray(nlpEntitiesArray) && nlpEntitiesArray.length > 0) {
		nlpEntitiesArray.filter((nlpEntity) => {
			return nlpEntity.confidence >= limit;
		});
	}
}

function getNlpEntityByName(nlp, name) {
	return nlp && nlp.entities && nlp.entities[name];
}
