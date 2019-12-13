'use strict';

const request = require('request'),
	constants = require('../../../constants');

/*
instructions:
https://developers.facebook.com/docs/messenger-platform/introduction/conversation-components/#welcome_screen
 */

exports.initMessengerWindow = function() {
	const headers = {
		'Content-Type': 'application/json'
	};

	const dataString = JSON.stringify({
		get_started: { payload: constants.payloads.PAYLOAD_GET_STARTED },
		greeting: [
			{
				locale: 'default',
				text: 'שלום {{user_first_name}}, לחץ על הכפתור בכדי להתחיל'
			}
		],
		persistent_menu: [
			{
				locale: 'default',
				composer_input_disabled: false,
				call_to_actions: [
					{
						title: 'חזור להתחלה',
						type: 'postback',
						payload: constants.payloads.PAYLOAD_RESTART
					}
				]
			}
		]
	});

	const options = {
		url: `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
		method: 'POST',
		headers: headers,
		body: dataString
	};

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log("Setting: Menu, 'Get Started' button, and Welcome Messages was completed successfully.");
		} else if (error) {
			console.error(`Failed to init :\n${JSON.stringify(error, null, 4)}`);
		}
	}

	request(options, callback);
};
