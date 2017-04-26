var express = require('express'),
	proxy = require('express-http-proxy'),
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

/* Cross browser proxy setup */
// app.use('/proxy', proxy('http://serverroutes.herokuapp.com/', {
//   forwardPath: function(req, res) {
//     return require('url').parse(req.url).path;
//   }
// }));

/* Routes */
// GET
app.get('/api/id', Api.getJSON);
app.get('/api/id/:id', Api.getJSONById);
app.get('/api/routes', Api.Routes);
app.get('/api/route/:routername', Api.getRouteInfo);
app.get('/api/logs', Api.logs);
app.get('/api/status', Api.status);
app.get('/api/status/:dstinterface', Api.getRouterInterfaceName);
app.get('/api/status/lsp/:lspname', Api.getLSPName);
app.get('/api/statushistory/:lspname', Api.getStatusHistoryLSPName);
app.get('/api/linechart', Api.linechart);
app.get('/api/link', Api.link);
app.get('/api/apply', Api.getPOSTJSON);
app.get('/api/tableheading', Api.getTableHeading);
app.get('/api/tablestats', Api.getTableStats);
app.get('/api/tableinfo', Api.getTableInfo);
app.get('/api/lspmesh', Api.lspMesh);
app.get('/api/lspmeshdetailheading', Api.lspMeshDetailHeading);
app.get('/api/lspmeshdetailstats', Api.lspMeshDetailStats);
app.get('/api/lspmeshdetailstatsold', Api.lspMeshDetailStatsOld);
app.get('/api/mapnodes', Api.getMapNodes);
app.get('/api/maplinks', Api.getMapLinks);

// POST
app.post('/api/apply', function(req, res) {
	res.send(req.body);
	var obj = {name: 'JP'}
	jsonfile.writeFileSync(file, req.body);
});
app.post('/api/applyanother', function(req, res) {
	res.send(req.body);
	jsonfile.writeFileSync(file1, req.body);
});

// express server
app.listen(port, function(req, res) {
	console.log("server listening on port : " + port);
	open("http://localhost:" + port);
});