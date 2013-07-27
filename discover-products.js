var request = require('request');
webpage = 'http://www.reddit.com/r/AmazonUnder5/hot.json?limit=100';

//get urls
request({uri : webpage, json:true, headers:{useragent: 'rrandomize product bot v. 0.0.1'}}, function(error, response, body) {
	if(!error && response.statusCode == 200) {
		for(var key in body.data.children) {
			var url = body.data.children[key].data.url;
			var asin = url.match(/http:\/\/(?:www\.|)amazon\.com\/(?:gp\/product|[^\/]+\/dp|dp)\/([^\/]+)/); //regex to extract asin from url
			if(asin != null)
				console.log(asin[1]);
			else
				console.log("No ASIN found.");
		}
		
	}
});