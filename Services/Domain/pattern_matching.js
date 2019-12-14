'use strict';

const constants = require('../../constants');
const stringUtils = require('../../Utils/string_ultis');

exports.matchPattern = function(message) {
	console.log('debug: ' + message);
	if (message === 'GET_STARTED') {
		console.log('its get started pattern');
		return require('../../Patterns/greeting_pattern');
	}
};
