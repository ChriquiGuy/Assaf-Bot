'use strict';
const constants = require('../../../constants');
const facebook = require('fb-messenger-bot-api');
const profileClient = new facebook.FacebookProfileAPIClient(process.env.PAGE_ACCESS_TOKEN);

exports.initMessengerWindow = function() {
	// Setting Greeting Message
	profileClient.setGreetingMessage('לחץ על הכפתור בכדי להתחיל').then((result) => {});

	// Setting Get Started button
	profileClient.setGetStartedAction(undefined, 'GET_STARTED').then((result) => {});

	//! Need to fix :  Setting Persistent Menu
	// profileClient.setPersistentMenu(undefined, [ getPersistentMenuObject() ]).then((result) => {});
};

// Return persistent_menu object
function getPersistentMenuObject() {}
