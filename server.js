var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	open = require('open'),
	Api = require('./app/api');
	// $ = require("jquery"),
	// toastr = require('toastr');

var port = process.env.PORT || 9090;

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
// app.post('/api/apply', Api.postJSON);
// app.post('http://10.12.21.14:9095/apply', Api.postJSON);

// express server
app.listen(port, function(req, res) {
	console.log("server listening on port : " + port);
	open("http://localhost:" + port);
});