'use strict';

// Handle response actions array
exports.executeResponseActions = function(responseObject) {
	responseObject.actions[0];
	// // If there actions to execute
	// if (responseObject && responseObject.actions) {
	// 	// Runs on responses actions array and execute them one by one
	// 	for (const action of responseObject.actions) {
	// 		executeAction(action, responseObject);
	// 	}
	// }
	return responseObject;
};

exports.executeAction = function(action, responseObject) {
	if (action) action.execute(responseObject);
};
