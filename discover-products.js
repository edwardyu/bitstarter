/*
Scrapes Amazon items from reddit and adds them to a database
*/
var request = require('request');
var urls = ['http://www.reddit.com/r/AmazonUnder5/hot.json?limit=100',
 'http://www.reddit.com/r/AmazonUnder15/hot.json?limit=100', 
 'http://www.reddit.com/r/AmazonUnder20/hot.json?limit=100', 
 'http://www.reddit.com/r/TheBestofAmazon/hot.json?limit=100',
 'http://www.reddit.com/r/TheCheapestofAmazon/hot.json?limit=100',
 'http://www.reddit.com/r/TheCoolestofAmazon/hot.json?limit=100'
 ];

for(var i = 0; i < urls.length; i++) {
	//get urls
	request({uri : urls[i], json:true, headers:{useragent: 'rrandomize product bot v. 0.0.1'}}, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			for(var key in body.data.children) {
				var url = body.data.children[key].data.url;
				//remove unnecessary data from url
				if(url.indexOf("?") != -1)
					url = url.substring(0, url.indexOf("?"));
				var asin = url.match(/http:\/\/(?:www\.|)amazon\.com\/(?:gp\/product|[^\/]+\/dp|dp)\/([^\/]+)/); //regex to extract asin from url
				if(asin != null)
					console.log(asin[1]);
				else
					console.log("No ASIN found.");
			}
			
		}
	});

}