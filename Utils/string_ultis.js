'use strict';

exports.isString = function(str) {
	return str && (typeof str === 'string' || str instanceof String);
};

exports.startStringWithUppercase = function(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
};
