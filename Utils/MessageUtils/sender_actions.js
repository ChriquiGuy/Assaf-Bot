const request = require('request');
const wait = require('wait-for-stuff');

exports.markTyping = function(senderPSID) {
	runAction(senderPSID, 'typing_on');
	wait.for.time(2);
	runAction(senderPSID, 'typing_off');
};

exports.markSeen = (senderPSID) => runAction(senderPSID, 'mark_seen');

runAction = function(senderPSID, action) {
	var headers = {
		'Content-Type': 'application/json'
	};

	var dataString = {
		recipient: {
			id: senderPSID
		},
		sender_action: action
	};

	var options = {
		url: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + process.env.PAGE_ACCESS_TOKEN,
		method: 'POST',
		headers: headers,
		body: dataString
	};

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(body);
		}
	}
	request(options, callback);
};
