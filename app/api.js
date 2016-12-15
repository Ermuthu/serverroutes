var jsonfile = require('jsonfile');
var _ = require('lodash');

module.exports = {
	getJSON: function(req, res) {
		var file = './db/db.json';
		res.send(jsonfile.readFileSync(file));
	},
	getJSONById: function(req, res) {
		var _id = req.params.id,
			file = './db/db.json',
			data = jsonfile.readFileSync(file).hits.hits;
		var result = _.map(data, function(d) {
			if(d._id == _id)
				res.send(d);
		});
	},
	postJSON: function(req, res) {
		res.send(req.body);
	},
	Routes: function(req, res) {
		var routes = './db/routes.json';
		res.send(jsonfile.readFileSync(routes));
	},
	getRouteInfo: function(req, res) {
		var router_info = './db/router.json';
		res.send(jsonfile.readFileSync(router_info));
	}
}