var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());
app.use(express.static(__dirname));
app.get('/', function(request, response) {
	var index = fs.readFileSync('index.html').toString('utf-8');
  response.send(index);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
