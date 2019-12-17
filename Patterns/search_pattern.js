'use strict';
const nlpDiagnosis = require('../Services/Domain/nlp_diagnosis');

// Get the best matching response to the message
exports.getResponse = function(messageObject) {
	// Random start message
	const startersMessages = [ 'אני על זה!', 'מתחיל בחיפושים!', 'אחלה בחירה! מתחיל בחיפושים' ];
	var messageStart = startersMessages[Math.floor(Math.random() * startersMessages.length)];

	// Init descriptions
	var description = '';

	// Print Object
	const object = nlpDiagnosis.getEntity(messageObject, 'object').value;
	if (object) description += 'מחפש לך ' + object;
	else
		return {
			messages: [
				'אני מצטער אני חדש בארץ, ולא כל כך הבנתי מה אתה מנסה לחפש',
				'אשמח אם תוכל לנסות להסביר לי בצורה פשוטה יותר'
			],
			actions: [ undefined ]
		};

	// Print Money amount
	const amount_of_money = nlpDiagnosis.getEntity(messageObject, 'amount_of_money');
	if (amount_of_money && amount_of_money.to && amount_of_money.from) {
		description += ', החל מ ' + amount_of_money.from.value + ' ועד ' + amount_of_money.to.value + ' שקלים.';
	} else if (amount_of_money && amount_of_money.to) {
		description += ' במחיר של עד ' + amount_of_money.to.value + ' שקלים.';
	}

	// Print pick up\deleviry
	const pick_up = nlpDiagnosis.getEntity(messageObject, 'pick_up');
	const delivery = nlpDiagnosis.getEntity(messageObject, 'delivery');
	if (pick_up) description += ' לאיסוף עצמי ';
	else if (delivery) description += ' למשלוח עד הבית ';

	// Print location
	const location = nlpDiagnosis.getEntity(messageObject, 'location');
	if ((pick_up || delivery) && location) description += 'באיזור ' + location.value;

	// Add dot
	description += '.';
	const responseActions = undefined;

	const response = {
		messages: [ messageStart, description ],
		actions: [ responseActions ]
	};

	return response;
};

//  object :  {
//    suggested: true,
//    confidence: 0.75749272937134,
//    value: 'אופני סינגל ספיד',
//    type: 'value',
//    _entity: 'object',
//    _body: 'אופני סינגל ספיד',
//    _start: 5,
//    _end: 21
//  }
//  amount_of_money :  {
//    confidence: 1,
//    to: { value: 2000, unit: 'ILS' },
//    type: 'interval',
//    _entity: 'amount_of_money',
//    _body: 'עד 2000 שח',
//    _start: 22,
//    _end: 32
//  }
//  pick_up :  {
//    confidence: 0.99235668753514,
//    value: 'איסוף עצמי',
//    type: 'value',
//    _entity: 'pick_up',
//    _body: 'איסוף עצמי',
//    _start: 34,
//    _end: 44
//  }
//  location :  {
//    suggested: true,
//    confidence: 0.927025,
//    value: 'תל אביב',
//    type: 'value',
//    _entity: 'location',
//    _body: 'תל אביב',
//    _start: 52,
//    _end: 59
//  }
