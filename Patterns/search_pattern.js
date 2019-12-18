"use strict";
const nlpDiagnosis = require("../Services/Domain/nlp_diagnosis");

const SPACE = " ";

// Get the best matching response to the message
exports.getResponse = function(messageObject) {
  // Random start message
  const startersMessages = [
    "אני על זה!",
    "מתחיל בחיפושים!",
    "אחלה בחירה! מתחיל בחיפושים",
    "רות עבור",
    "רות היישר!"
  ];
  var messageStart = startersMessages[Math.floor(Math.random() * startersMessages.length)];

  // Init descriptions
  var description = "";

  // Print Object
  const object = nlpDiagnosis.getEntity(messageObject, "object");
  if (object) description += "מחפש לך " + object.value;
  else
    return {
      messages: [
        "אני מצטער אני חדש בארץ, ולא כל כך הבנתי מה אתה מנסה לחפש",
        "אשמח אם תוכל לנסות להסביר לי בצורה פשוטה יותר"
      ],
      actions: [undefined]
    };

  // Print Money amount
  const amount_of_money = nlpDiagnosis.getEntity(messageObject, "amount_of_money");
  if (amount_of_money && amount_of_money.to && amount_of_money.from) {
    description +=
      SPACE +
      "בטווח של" +
      SPACE +
      amount_of_money.from.value +
      "-" +
      amount_of_money.to.value +
      SPACE +
      "שקלים";
  } else if (amount_of_money && amount_of_money.to) {
    description += SPACE + "עד" + SPACE + amount_of_money.to.value + SPACE + "שקלים";
  }

  // Print pick up\deleviry
  const pick_up = nlpDiagnosis.getEntity(messageObject, "pick_up");
  const delivery = nlpDiagnosis.getEntity(messageObject, "delivery");
  if (pick_up) description += SPACE + "לאיסוף עצמי";
  else if (delivery) description += SPACE + "כולל משלוח עד הבית";

  // Print location
  const location = nlpDiagnosis.getEntity(messageObject, "location");
  if (location) description += SPACE + "באיזור" + SPACE + location.value;

  // Add dot
  description += ".";
  const responseActions = undefined;

  const response = {
    messages: [messageStart, description],
    actions: [responseActions]
  };

  return response;
};

// function CreatSearchObject(messageObject) {
//   const searchObject = {
//     name = undefined,
//     type = undefined,
//     details = undefined,
//     color = undefined,
//     size = undefined,
//     shipment =undefined,
//     loaction = undefined,
//     price = {from = undefined , to = undefined},
//   };
// }
