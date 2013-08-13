var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());

app.use(express.bodyParser());
app.use(express.static(__dirname));

app.get('/', function(request, response) {
	var index = fs.readFileSync('index.html').toString('utf-8');
  response.send(index);
});

app.post('/betalist', function(request, response) {
	var email = request.body.email;
	if(isValidEmail(email)) {
		fs.openSync('emails.txt', 'a');
		fs.appendFile('emails.txt', email, function (err) {
			if (err) throw err;
		});

		response.send(email + ' was appended to file!');
	}
	else
		response.send("Not a valid email.");
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});

function isValidEmail(str) {
	if(str.indexOf('@') !== -1 && str.indexOf('.') !== -1)
		return true;
	else
		return false;
}