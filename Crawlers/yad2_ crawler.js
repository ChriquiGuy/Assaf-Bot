const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
var HTMLParser = require('node-html-parser');

const url = 'https://www.yad2.co.il/products/all?info=%D7%90%D7%95%D7%A4%D7%A0%D7%99%D7%99%D7%9D';

puppeteer
	.launch()
	.then((browser) => browser.newPage())
	.then((page) => {
		return page.goto(url).then(function() {
			return page.content();
		});
	})
	.then((html) => {
		var root = HTMLParser.parse(html);
		const productList = root.querySelector('.feed_list');
		console.log(productList);
	})
	.catch(console.error);
