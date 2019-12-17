'use strict';

const messageHandler = require('./message_handler');
const messengerWindow = require('../Services/Gateways/Facebook/messenger_window.js');

// Imports dependencies and set up http server
const express = require('express'),
	bodyParser = require('body-parser'),
	app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
let port = process.env.PORT || 1337;
app.listen(port, () => console.log('webhook is listening on port: ' + port));

// Server index page
app.get('/', function(req, res) {
	res.send('In development');
});

// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {
	let body = req.body;

	// Checks this is an event from a page subscription
	if (body.object === 'page') {
		// Returns a '200 OK' response to all requests
		res.status(200).send('EVENT_RECEIVED');
		// Iterates over each entry - there may be multiple if batched
		body.entry.forEach(function(entry) {
			// Gets the message. entry.messaging is an array, but
			// will only ever contain one message, so we get index 0
			let webhook_event = entry.messaging[0];
			// Pass the event to the handler function
			console.log('INCOMING_EVENT');
			messageHandler.handleIncomingMessage(webhook_event);
			console.log('EVENT_FINISHED');
		});
	} else {
		// Returns a '404 Not Found' if event is not from a page subscription
		res.sendStatus(404);
	}
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
	// Your verify token. Should be a random string.
	let TOKEN = process.env.VERIFICATION_TOKEN;
	// Parse the query params
	let mode = req.query['hub.mode'];
	let token = req.query['hub.verify_token'];
	let challenge = req.query['hub.challenge'];

	// Checks if a token and mode is in the query string of the request
	if (mode && token) {
		// Checks the mode and token sent is correct
		if (mode === 'subscribe' && token === TOKEN) {
			// Responds with the challenge token from the request
			console.log('WEBHOOK_VERIFIED');
			res.status(200).send(challenge);
		} else {
			// Responds with '403 Forbidden' if verify tokens do not match
			console.log('WEBHOOK_FORBIDDEN');
			res.sendStatus(403);
		}
	}
});

messengerWindow.initMessengerWindow();
