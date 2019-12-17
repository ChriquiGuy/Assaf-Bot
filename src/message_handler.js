"use strict";

const responseManager = require("./response_manger");
const messengerAction = require("../Utils/MessageUtils/sender_actions");
const wait = require("wait-for-stuff");
const facebook = require("fb-messenger-bot-api");
const messageClient = new facebook.FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN);
const incomingMessageUtils = require("../Utils/MessageUtils/incoming_message_ultis");

// Handles incoming messages
exports.handleIncomingMessage = function(messageObject) {
  // Extract sender id from message object
  const senderId = messageObject.sender.id;
  // Extract message string from message object
  const messageText = incomingMessageUtils.getTextFromMessage(messageObject);
  // Log to console incoming message
  console.log(`Incoming message from PSID: ${senderId}.\nMessage: ${messageText}.`);

  // Get response object to the incoming message
  let response = responseManager.matchResponse(messageObject);

  if (response) {
    // Mark message as seen and wait 'x' amount of time before response back (x=reading time)
    messengerAction.markSeen(senderId, messageObject);
    // If appropriate response found, send all message in it to the client
    sendResponseMessages(senderId, response);
  } else {
    // If not, transfer handling to human
    // TODO : add human handeling
    console.log("Move message handling to a human");
  }
};

// Sends response messages back to sender
const sendMessage = function(senderId, response) {
  // Log response before sending
  console.log(`Outgoing message to PSID: ${senderId}.\nResponse Message: ${response}.`);
  // Mark typing and wait 'x' amount of time before disable typing (x=writing time)
  messengerAction.markTyping(senderId, response);
  // Send the HTTP request to the Messenger Platform
  messageClient.sendTextMessage(senderId, response).then(result => {
    `Result sent with: ${result}`;
  });
};

// Handle response messages array
async function sendResponseMessages(senderId, response) {
  // Runs on message responses array and send them one by one
  for (const message of response.messages) {
    // Send message to the sender
    sendMessage(senderId, message);
    wait.for.time(0.3);
  }
}
