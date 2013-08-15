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
		fs.appendFile('emails.txt', email + '\n', function (err) {
			if (err) throw err;
		});
		console.log(email + 'was appended to file.');
		response.redirect('/');
	}
	else {
		console.log('Not a valid email.');
		response.redirect('/');
	}
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