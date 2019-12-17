"use strict";
const nlpDiagnosis = require("../Services/Domain/nlp_diagnosis");

// Get the best matching response to the message
exports.getResponse = function(messageObject) {
  console.log("object : ", nlpDiagnosis.getEntity(messageObject, "object"));
  console.log("amount_of_money : ", nlpDiagnosis.getEntity(messageObject, "amount_of_money"));
  console.log("pick_up : ", nlpDiagnosis.getEntity(messageObject, "pick_up"));
  console.log("location : ", nlpDiagnosis.getEntity(messageObject, "location"));

  const response = "אני על זה!";

  var description;

  const object = nlpDiagnosis.getEntity(messageObject, "object").value;
  if (object) description += `מחפש לך ${object} `;

  const responseActions = undefined;

  const response = {
    messages: [response, description],
    actions: [responseActions]
  };

  return response;
};
