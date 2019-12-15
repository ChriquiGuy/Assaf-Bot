"use strict";

const responseManager = require("./response_manger");
const messengerAction = require("../Utils/MessageUtils/sender_actions");
const facebook = require("fb-messenger-bot-api");
const messageClient = new facebook.FacebookMessagingAPIClient(
  process.env.PAGE_ACCESS_TOKEN
);

// Handles incoming messages
exports.handleIncomingMessage = function(received_message) {
  const senderId = received_message.sender.id;

  // Get response to the incoming message
  let response = responseManager.matchResponse(senderId, received_message);
  if (response) {
    // Mark message as seen and wait 'x' amount of time before response back (reading time)
    messengerAction.markSeen(senderId, received_message);
    // If appropriate response found, send it to the client
    sendMessage(senderId, response);
  } else {
    // If not, transfer handling to human
    // TODO : add human handeling
    console.log("Move message handling to a human");
  }
};

// Sends response messages via the Send API (send the message {messageText} to user {sender_psid}
const sendMessage = function(senderId, response) {
  // Log response before sending
  console.log(
    `Outgoing message to PSID: ${senderId}.\nResponse Message: ${response}.`
  );
  // Mark typing and wait 'x' amount of time before disable typing (writing time)
  messengerAction.markTyping(senderId, response);
  // Send the HTTP request to the Messenger Platform`
  messageClient.sendTextMessage(senderId, response).then(result => {});
};
