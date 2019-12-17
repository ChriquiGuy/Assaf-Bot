"use strict";
const nlpDiagnosis = require("../Services/Domain/nlp_diagnosis");

// Get the best matching response to the message
exports.getResponse = function(messageObject) {
  console.log("object : ", nlpDiagnosis.getEntity(messageObject, "object"));
  console.log("amount_of_money : ", nlpDiagnosis.getEntity(messageObject, "amount_of_money"));
  console.log("pick_up : ", nlpDiagnosis.getEntity(messageObject, "pick_up"));
  console.log("location : ", nlpDiagnosis.getEntity(messageObject, "location"));

  const messageStart = "אני על זה!";

  var description;

  const object = nlpDiagnosis.getEntity(messageObject, "object").value;
  if (object) description += "מחפש לך " + object;

  const amount_of_money = nlpDiagnosis.getEntity(messageObject, "amount_of_money");
  if (amount_of_money && amount_of_money.to && amount_of_money.from) {
    description +=
      ", החל מ - " + amount_of_money.from.value + " ועד - " + amount_of_money.to.value + " שקלים";
  } else if (amount_of_money && amount_of_money.to.value) {
    description += "במחיר של עד " + amount_of_money.to.value + "שקלים";
  }

  const responseActions = undefined;

  const response = {
    messages: [messageStart, description],
    actions: [responseActions]
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
