'use strict';

const DEFAULT_QUICK_REPLY_IMAGE_URL = 'http://icons-for-free.com/free-icons/png/512/197591.png';
const DEFAULT_BUTTON_ATTACHMENT_URL = 'https://cdn.pixabay.com/photo/2016/06/24/10/47/architecture-1477041_960_720.jpg';
const DEFAULT_BUTTON_SUBTITLE = 'Tap a button to answer.';

/* 
Create a text message response object from a string
    text: the text to send
*/
exports.createTextMessageResponseObjectFromText = function(text) {
	return {
		text: text
	};
};

exports.createSingleButton = function(title, payload) {
	return {
		type: 'postback',
		title: title,
		payload: payload
	};
};

exports.createGenericTemplate = function(elements) {
	return {
		attachment: {
			type: 'template',
			payload: {
				template_type: 'generic',
				elements: elements
			}
		}
	};
};

/*
  "elements": [
    {
      "title": "<TITLE_TEXT>",
      "subtitle": "<SUBTITLE_TEXT>",
      "image_url": "<IMAGE_URL_FOR_THUMBNAIL>",
      "buttons": [<BUTTON_OBJECT>],
      "default_action": Element Default Action - see 'createDefaultAction' function
    },
*/
exports.createSingleElement = function(
	title,
	listOfButtons,
	imageUrl = DEFAULT_BUTTON_ATTACHMENT_URL,
	subtitle = DEFAULT_BUTTON_SUBTITLE,
	defaultAction
) {
	return {
		title: title,
		buttons: listOfButtons,
		image_url: imageUrl,
		subtitle: subtitle,
		default_action: defaultAction
	};
};

/*
      "default_action": {
        "type": "web_url",
        "url": "<URL_TO_OPEN_WHEN_ITEM_IS_TAPPED>",
        "messenger_extensions": <TRUE | FALSE>,
        "webview_height_ratio": "<COMPACT | TALL | FULL>"
      }
 */
exports.createDefaultAction = function(url) {
	return {
		type: 'web_url',
		url: url,
		messenger_extensions: false,
		webview_height_ratio: 'tall'
	};
};

/*
Create quick replies response object
    text: the message that will be displayed above the quick replies options
    listOfReplies: the quick replies buttons
*/
exports.createQuickReplies = function(text, listOfReplies) {
	return {
		text: text,
		quick_replies: listOfReplies
	};
};

/*
creates multiple quick replies buttons
    - startNumber: the required number to start from
    - startNumber: the required number to end
    - postbackPayloadPrefix: the prefix of the payload that we will return when the user press the button,
      for example : CHILDREN_2
*/
exports.createNumberedQuickReplies = function(startNumber, endNumber, postbackPayloadPrefix) {
	let listOfReplies = [];
	for (let i = startNumber; i <= endNumber; i++) {
		const quickReplyPayload = postbackPayloadPrefix + '_' + i.toString();
		listOfReplies.push(exports.createSingleQuickReply(i.toString(), quickReplyPayload));
	}
	return listOfReplies;
};

/* 
Create single quick reply
      - title : the title of the quick reply
      - payload: the payload we will get when a user clicks the quick reply button
*/
exports.createSingleQuickReply = function(title, payload, imageUrl = DEFAULT_QUICK_REPLY_IMAGE_URL) {
	return {
		content_type: 'text',
		title: title,
		payload: payload,
		image_url: imageUrl
	};
};
