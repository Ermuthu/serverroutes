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
app.post('/api/apply', function(req, res) {
	console.log(req.body);
	res.send(req.body);
	var obj = {name: 'JP'}
	jsonfile.writeFile(file, req.body);
});
app.get('/api/apply', Api.getPOSTJSON);
// app.post('http://10.12.21.14:9095/apply', Api.postJSON);

// express server
app.listen(port, function(req, res) {
	console.log("server listening on port : " + port);
	open("http://localhost:" + port);
});