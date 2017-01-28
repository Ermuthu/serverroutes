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
		// var router_info = './db/router.json';
		var router_info = './db/router_new.json';
		res.send(jsonfile.readFileSync(router_info));
	},
	getPOSTJSON: function(req, res) {
		var postfile = './db/post.json';
		res.send(jsonfile.readFileSync(postfile));
	},
	logs: function(req, res) {
		var records = './db/new_records_2.json';
		res.send(jsonfile.readFileSync(records));
	},
	status: function(req, res) {
		// var status = './db/status.json';
		// var status_new = './db/status_new.json';
		// var status_logs = './db/status_logs.json';
		var status_path_type = './db/status_path_type.json';
		res.send(jsonfile.readFileSync(status_path_type));
	},
	linechart: function(req, res) {
		var lc = './db/jsonfile_graph.json';
		res.send(jsonfile.readFileSync(lc));
	}
}