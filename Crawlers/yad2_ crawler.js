var Crawler = require('crawler');
var HTMLParser = require('node-html-parser');

var c = new Crawler({
	maxConnections: 10,
	// This will be called for each crawled page
	callback: function(error, res, done) {
		if (error) {
			console.log(error);
		} else {
			var $ = res.$;
			// $ is Cheerio by default
			//a lean implementation of core jQuery designed specifically for the server
			console.log($('title').text());
		}
		done();
	}
});

// Queue just one URL, with default callback
c.queue('https://www.yad2.co.il/products/all?info=%D7%90%D7%95%D7%A4%D7%A0%D7%99%D7%99%D7%9D');

// Queue URLs with custom callbacks & parameters
c.queue([
	{
		uri: 'http://www.amazon.com',
		jQuery: false,

		// The global callback won't be called
		callback: function(error, res, done) {
			if (error) {
				console.log(error);
			} else {
				const root = HTMLParser.parse(res.body);
				console.log('Root : ', root);
				// console.log('First Child : ', root.firstChild.structure);
				console.log('query #list: \n', root.querySelector('#list'));
			}
			done();
		}
	}
]);
