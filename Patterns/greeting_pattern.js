'use strict';

const SPACE = ' ';

// Get the best matching response to the message
exports.getResponse = function() {
	const startMessage =
		'שלום קוראים לי אסף, אני אעזור לך למצוא את המוצר שאתה מחפש. \nאני רק צריך שתתאר לי אותו במילים פשוטות ואעדכן אותך עבור כל מוצר רלוונטי שעולה לרשת.';
	const explainMessage = 'לדוגמא: מחפש אופני סינגל ספיד עד 2000 שח לאיסוף עצמי מאיזור תל אביב.';

	const responseActions = undefined;

	const response = {
		messages: [ startMessage, explainMessage ],
		actions: [ responseActions ]
	};

	return response;
};
