var jsonfile = require('jsonfile');
var _ = require('lodash');

module.exports = {
	getJSON: function(req, res) {
		var file = './db/hit.json';
		res.send(jsonfile.readFileSync(file));
	},
	getJSONIp: function(req, res) {
		var _ip = req.params.ip;
		var file = './db/hit.json';
		var data = jsonfile.readFileSync(file);
		var ip = data.hits.hits;
		var result = _.map(ip, function(d) {
			if(d._source.router_name == _ip)
				res.send(d._source);
		});
	}
}