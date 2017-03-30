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
		// var status_path_type = './db/status_path_type.json';
		var jan30 = './db/mar01_status.json';
		res.send(jsonfile.readFileSync(jan30));
	},
	getLSPName: function(req, res) {
		var LSPName = req.params.lspname,
			file = './db/mar01_status.json',
			data = jsonfile.readFileSync(file).hits.hits;
		var result = _.map(data, function(d) {
			if(d._id == LSPName){
				res.send(d);
			}
		});
	},
	linechart: function(req, res) {
		var lc = './db/jsonfile_graph.json';
		res.send(jsonfile.readFileSync(lc));
	},
	link: function(req, res) {
		// var link1 = './db/link_02_04.json';
		// var link2 = './db/link_02_06.json';
		// var link3 = './db/link_02_09.json';
		var link4 = './db/link_02_16.json';
		res.send(jsonfile.readFileSync(link4));
	},
	getRouterInterfaceName: function(req, res) {
		var getRouterInterfaceName1 = './db/link_route_02_06.json';
		res.send(jsonfile.readFileSync(getRouterInterfaceName1));
	},
	getTableHeading: function(req, res) {
		var getTableHeading = './db/table_heading_02_12.json';
		res.send(jsonfile.readFileSync(getTableHeading));
	},
	getTableStats: function(req, res) {
		var getTableStats = './db/table_stats_02_12.json';
		res.send(jsonfile.readFileSync(getTableStats));
	},
	getTableInfo: function(req, res) {
		var getTableInfo = './db/table_data_03_05.json';
		res.send(jsonfile.readFileSync(getTableInfo));
	},
	lspMesh: function(req, res) {
		var lspMesh = './db/LSPMesh_02_15.json';
		res.send(jsonfile.readFileSync(lspMesh));
	},
	getMapNodes: function(req, res) {
		var mapNodes = './db/mapnodes_03_25.json';
		res.send(jsonfile.readFileSync(mapNodes));
	},
	getMapLinks: function(req, res) {
		// var mapLinks = './db/maplinks_03_25.json';
		var mapLinks = './db/maplinks_03_31.json';
		res.send(jsonfile.readFileSync(mapLinks));
	}
}