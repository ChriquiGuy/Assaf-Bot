'use strict';

const constants = require('../../constants');
const stringUtils = require('../../Utils/string_ultis');

exports.matchPattern = function(message) {
	if (message === 'GET_STARTED') {
		return require('../../Patterns/greeting_pattern');
	}

	return undefined;
};
