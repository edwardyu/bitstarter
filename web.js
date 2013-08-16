var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());
var mongojs = require('mongojs');
var db = mongojs('admin:test@dharma.mongohq.com:10092/app17035271',['emails']);

app.use(express.bodyParser());
app.use(express.static(__dirname));

app.get('/', function(request, response) {
	var index = fs.readFileSync('index.html').toString('utf-8');
  response.send(index);
});

app.post('/betalist', function(request, response) {
	var email = request.body.email;
	if(isValidEmail(email)) {
		db.emails.insert({'email': email}, function(err) {
			if(err)
				console.log('Error: ' + err);
		});
		console.log(email + 'was added to database');
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