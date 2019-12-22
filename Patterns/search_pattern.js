"use strict";
const nlpDiagnosis = require("../Services/Domain/nlp_diagnosis");
const staticTemplates = require("../Templates/static_template");

const SPACE = " ";
const ACTIONS_FOLDER = process.cwd() + "/Actions";
const unvalidProduct = ["דירה", "דירת"];

// Get the best matching response to the message
exports.getResponse = function(messageObject) {
  // Get pre description message (random)
  const preMessages = getPreMessage();
  // Init search object
  var serachProduct = {};
  // Find name from message and insert to object
  serachProduct.name = getObjectName(messageObject);
  // Check if an object not found, send unknow object response
  // Else check if the product is a valid product for search
  if (!serachProduct.name) return unknowObjectRespones();
  else if (!checkValidation(serachProduct.name)) return unvalidObjectRespones();
  // Find price from message and insert to object {from, to}
  serachProduct.price = getObjectPrice(messageObject);
  // Find shipment from message and insert to object {pick_up, delivery}
  serachProduct.shipment = getObjectShipment(messageObject);
  // Find location from message and insert to object
  serachProduct.location = getObjectLocation(messageObject);
  // Creates a text response detailing the product we were asked to search
  const searchDescription = createSearchDescription(serachProduct);
  // Add relevant action to this response
  const responseActions = ACTIONS_FOLDER + "search_product";
  // Create an response object
  const response = {
    messages: [preMessages, searchDescription],
    actions: [responseActions],
    product: serachProduct,
    sender: messageObject.sender.id
  };
  // Returning the response object
  return response;
};

// Return random pre message
function getPreMessage() {
  const preMessages = [
    "אני על זה!",
    "מתחיל בחיפושים!",
    "אחלה בחירה! מתחיל בחיפושים",
    "רות עבור",
    "רות היישר!"
  ];
  // Randomize from array of messages and return
  return preMessages[Math.floor(Math.random() * preMessages.length)];
}

// Build a string that describe the product we requested to search
function createSearchDescription(serachProduct) {
  // Init description text
  var description = "";
  // Add product name to text
  if (serachProduct.name) description += "מחפש לך " + serachProduct.name;
  // Add product price to text
  if (serachProduct.price && serachProduct.price.to && serachProduct.price.from) {
    description +=
      SPACE +
      "בטווח של" +
      SPACE +
      serachProduct.price.from +
      "-" +
      serachProduct.price.to +
      SPACE +
      "שקלים";
  } else if (serachProduct.price && serachProduct.price.to) {
    description += SPACE + "עד" + SPACE + serachProduct.price.to + SPACE + "שקלים";
  }
  // Add product shipment details to text
  if (serachProduct.shipment && serachProduct.shipment.delivery)
    description += SPACE + "כולל משלוח עד הבית";
  else if (serachProduct.shipment && serachProduct.shipment.pick_up)
    description += SPACE + "לאיסוף עצמי";
  // Add product location to text
  if (serachProduct.location) description += SPACE + "באיזור" + SPACE + serachProduct.location;
  // Add final dot
  description += ".";
  return description;
}

// Return product name from message
function getObjectName(messageObject) {
  const name = nlpDiagnosis.getEntity(messageObject, "object");
  if (name) return name.value;
}

// Return product price from message
function getObjectPrice(messageObject) {
  const amount_of_money = nlpDiagnosis.getEntity(messageObject, "amount_of_money");
  if (amount_of_money && amount_of_money.to && amount_of_money.from) {
    return { from: amount_of_money.from.value, to: amount_of_money.to.value };
  } else if (amount_of_money && amount_of_money.to) {
    return { from: undefined, to: amount_of_money.to.value };
  } else if (amount_of_money && amount_of_money.from) {
    return { from: amount_of_money.from.value, to: undefined };
  }
}

// Return product shipment details from message
function getObjectShipment(messageObject) {
  const _pick_up = nlpDiagnosis.getEntity(messageObject, "pick_up");
  const _delivery = nlpDiagnosis.getEntity(messageObject, "delivery");
  if (_pick_up && !_delivery) return { pick_up: true, delivery: false };
  else if (!_pick_up && _delivery) return { pick_up: false, delivery: true };
  else return { pick_up: false, delivery: false };
}

// Return product location from message
function getObjectLocation(messageObject) {
  const location = nlpDiagnosis.getEntity(messageObject, "location");
  if (location) return location.value;
}

// Check if the product is a valid product for search
function checkValidation(productName) {
  for (let word of unvalidProduct) if (productName.includes(word)) return false;
  return true;
}

// Return response wehen product not found in message
function unknowObjectRespones() {
  return {
    messages: [
      "אני מצטער אני חדש בארץ, ולא כל כך הבנתי מה אתה מנסה לחפש",
      "אשמח אם תוכל לנסות להסביר לי בצורה פשוטה יותר"
    ],
    actions: [undefined]
  };
}

// Return response wehen product is not a valid product
function unvalidObjectRespones() {
  return staticTemplates.DooronTemplate;
}
