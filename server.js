var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	open = require('open'),
	Api = require('./app/api'),
	jsonfile = require('jsonfile');
	// $ = require("jquery"),
	// toastr = require('toastr');

var port = process.env.PORT || 9090;

var file = './db/post.json';
var file1 = './db/anotherpost.json';

// app.use(express.static(__dirname + './public'));
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());

//routes
// require('./app/routes')(app);

app.get('/api/id', Api.getJSON);
app.get('/api/id/:id', Api.getJSONById);
app.get('/api/routes', Api.Routes);
app.get('/api/route/:routername', Api.getRouteInfo);
app.get('/api/logs', Api.logs);
app.get('/api/status', Api.status);
app.get('/api/linechart', Api.linechart);
app.post('/api/apply', function(req, res) {
	res.send(req.body);
	var obj = {name: 'JP'}
	jsonfile.writeFileSync(file, req.body);
});
app.post('/api/applyanother', function(req, res) {
	res.send(req.body);
	jsonfile.writeFileSync(file1, req.body);
});
app.get('/api/apply', Api.getPOSTJSON);
// app.post('http://10.12.21.14:9095/apply', Api.postJSON);

// express server
app.listen(port, function(req, res) {
	console.log("server listening on port : " + port);
	open("http://localhost:" + port);
});