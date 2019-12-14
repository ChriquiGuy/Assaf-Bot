'use strict';

const constants = require('../../constants');

//? const diagnosis = nlpDiagnosis.analyzeNlp(message);
//? const message_diagnosis = JSON.stringify(diagnosis, null, 4);
//? console.log('Message diagnosis:' + message_diagnosis);

// Find best matching pattern to  incoming message
exports.matchPattern = function(message) {
	if (message === 'GET_STARTED') {
		return require('../../Patterns/greeting_pattern');
	}

	return undefined;
};
