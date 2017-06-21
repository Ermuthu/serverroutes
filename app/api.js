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
		// var jan30 = './db/mar01_status.json';
		var apr01 = './db/status_04_01.json';
		res.send(jsonfile.readFileSync(apr01));
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
	getStatusHistoryLSPName: function(req, res) {
		var lsp = './db/status_history_04_05.json';
		res.send(jsonfile.readFileSync(lsp));
	},
	linechart:
	 function(req, res) {
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
	lspMeshDetailHeading: function(req, res) {
		var lspMeshDetailHeading = './db/lspMeshDetailHeading_04_03.json';
		res.send(jsonfile.readFileSync(lspMeshDetailHeading));
	},
	lspMeshDetailStats: function(req, res) {
		// var lspMeshDetailStats = './db/lspMeshDetailStats_04_03.json';
		// var lspMeshDetailStats = './db/lspMeshDetailStats_04_11.json';
		var lspMeshDetailStats = './db/lspMeshDetailStats_04_26.json';
		res.send(jsonfile.readFileSync(lspMeshDetailStats));
	},
	lspMeshDetailStatsOld: function(req, res) {
		// var lspMeshDetailStats = './db/lspMeshDetailStats_04_03.json';
		var lspMeshDetailStats = './db/lspMeshDetailStats_04_11.json';
		// var lspMeshDetailStats = './db/lspMeshDetailStats_04_26.json';
		res.send(jsonfile.readFileSync(lspMeshDetailStats));
	},
	/* 
	 * LSP Mesh Default and complete API starts
	 */
	lspMeshHeading: function(req, res) {
		var lspmesh_default_heading = './db/lspmesh_default_heading_06_02.json';
		res.send(jsonfile.readFileSync(lspmesh_default_heading));
	},
	lspMeshCompleteHeading: function(req, res) {
		var lspmesh_complete_heading = './db/lspmesh_complete_heading_06_02.json';
		res.send(jsonfile.readFileSync(lspmesh_complete_heading));
	},
	lspMeshSource: function(req, res) {
		var srcparmas = req.params.sourceparams,
			lspmesh_default_source_bit_map = './db/lspmesh_default_source_bit_map_06_02.json',
			lspmesh_default_source_pri_cnt = './db/lspmesh_default_source_pri_cnt_06_02.json',
			lspmesh_default_source_sec_cnt = './db/lspmesh_default_source_sec_cnt_06_02.json',
			lspmesh_default_source_ter_cnt = './db/lspmesh_default_source_ter_cnt_06_02.json',
			lspmesh_default_source_scm_bit_map = './db/lspmesh_default_source_scm_bit_map_06_02.json',
			lspmesh_default_source_region_r1 = './db/lspmesh_default_source_bit_map_region_r1_06_02.json',
			lspmesh_default_source_region_r2 = './db/lspmesh_default_source_bit_map_region_r2_06_02.json',
			lspmesh_default_source_region_r3 = './db/lspmesh_default_source_bit_map_region_r3_06_02.json';
		if(srcparmas == 'pri_cnt')
			res.send(jsonfile.readFileSync(lspmesh_default_source_pri_cnt));
		else if(srcparmas == 'sec_cnt')
			res.send(jsonfile.readFileSync(lspmesh_default_source_sec_cnt));
		else if(srcparmas == 'ter_cnt')
			res.send(jsonfile.readFileSync(lspmesh_default_source_ter_cnt));
		else if(srcparmas == 'scm_bit_map')
			res.send(jsonfile.readFileSync(lspmesh_default_source_scm_bit_map));
		else if(srcparmas == 'region_r1')
			res.send(jsonfile.readFileSync(lspmesh_default_source_region_r1));
		else if(srcparmas == 'region_r2')
			res.send(jsonfile.readFileSync(lspmesh_default_source_region_r2));
		else if(srcparmas == 'region_r3')
			res.send(jsonfile.readFileSync(lspmesh_default_source_region_r3));
		else
			res.send(jsonfile.readFileSync(lspmesh_default_source_bit_map));
	},
	lspMeshCompleteSource: function(req, res) {
		var srcparmas = req.params.sourceparams,
			lspmesh_complete_source_bit_map = './db/lspmesh_complete_source_bit_map_06_02.json',
			lspmesh_complete_source_pri_cnt = './db/lspmesh_complete_source_pri_cnt_06_02.json',
			lspmesh_complete_source_sec_cnt = './db/lspmesh_complete_source_sec_cnt_06_02.json',
			lspmesh_complete_source_ter_cnt = './db/lspmesh_complete_source_ter_cnt_06_02.json',
			lspmesh_complete_source_scm_bit_map = './db/lspmesh_complete_source_scm_bit_map_06_02.json',
			lspmesh_complete_source_region_r1 = './db/lspmesh_complete_source_bit_map_region_r1_06_02.json',
			lspmesh_complete_source_region_r2 = './db/lspmesh_complete_source_bit_map_region_r2_06_02.json',
			lspmesh_complete_source_region_r3 = './db/lspmesh_complete_source_bit_map_region_r3_06_02.json';
		if(srcparmas == 'pri_cnt')
			res.send(jsonfile.readFileSync(lspmesh_complete_source_pri_cnt));
		else if(srcparmas == 'sec_cnt')
			res.send(jsonfile.readFileSync(lspmesh_complete_source_sec_cnt));
		else if(srcparmas == 'ter_cnt')
			res.send(jsonfile.readFileSync(lspmesh_complete_source_ter_cnt));
		else if(srcparmas == 'scm_bit_map')
			res.send(jsonfile.readFileSync(lspmesh_complete_source_scm_bit_map));
		else if(srcparmas == 'region_r1')
			res.send(jsonfile.readFileSync(lspmesh_complete_source_region_r1));
		else if(srcparmas == 'region_r2')
			res.send(jsonfile.readFileSync(lspmesh_complete_source_region_r2));
		else if(srcparmas == 'region_r3')
			res.send(jsonfile.readFileSync(lspmesh_complete_source_region_r3));
		else
			res.send(jsonfile.readFileSync(lspmesh_complete_source_bit_map));
	},
	/* 
	 * LSP Mesh Default and complete API ends
	 */
	getMapNodes: function(req, res) {
		var mapNodes = './db/mapnodes_03_25.json';
		res.send(jsonfile.readFileSync(mapNodes));
	},
	getMapLinks: function(req, res) {
		// var mapLinks = './db/maplinks_03_25.json';
		// var mapLinks = './db/maplinks_03_31.json';
		var mapLinks = './db/maplinks_04_12.json';
		// var mapLinks = './db/maplinks_04_18.json';
		// var mapLinks = './db/maplinks_04_19.json';
		// var mapLinks = './db/maplinks_04_26.json';
		res.send(jsonfile.readFileSync(mapLinks));
	},
	getMapLinksHighlight: function(req, res) {
		var mapLinksHighlight = './db/maplinks_highlight_06_20.json';
		res.send(jsonfile.readFileSync(mapLinksHighlight));
	}
}