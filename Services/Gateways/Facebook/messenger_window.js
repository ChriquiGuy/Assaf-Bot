'use strict';
const constants = require('../../../constants');
const facebook = require('fb-messenger-bot-api');
const profileClient = new facebook.FacebookProfileAPIClient(process.env.PAGE_ACCESS_TOKEN);

exports.initMessengerWindow = function() {
	// Setting Greeting Message
	profileClient.setGreetingMessage('לחץ על הכפתור בכדי להתחיל').then((result) => {});

	// Setting Get Started button
	profileClient.setGetStartedAction(undefined, 'GET_STARTED').then((result) => {});

	// Setting Persistent Menu
	profileClient.setPersistentMenu(undefined, [ getPersistentMenuObject() ]).then((result) => {});
};

// Return persistent_menu object
function getPersistentMenuObject() {
	return;
	{
		'persistent_menu'[
			{
				locale: 'default',
				composer_input_disabled: false,
				call_to_actions: [
					{
						type: 'postback',
						title: 'Talk to an agent',
						payload: 'CARE_HELP'
					},
					{
						type: 'postback',
						title: 'Outfit suggestions',
						payload: 'CURATION'
					},
					{
						type: 'web_url',
						title: 'Shop now',
						url: 'https://www.originalcoastclothing.com/',
						webview_height_ratio: 'full'
					}
				]
			}
		];
	}
}
