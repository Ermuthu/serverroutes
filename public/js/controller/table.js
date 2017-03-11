ngElastic.controller('tableController', function($scope, $http) {
	// Title
	$scope.table = "Table";
	$scope.isCollapsed = true;

	// set value for limit dropdown
	$scope.setLimit = [{id:5},{id:10},{id:'All'}];

	// set value for dir dropdown
	$scope.setDir = [{dir:'In'},{dir:'Out'},{dir:'Default'}];

	$scope.limit = 5;

	// change limit value as per user limit (dropdown)
	$scope.findLimit = function(res) {
		$scope.limit = res.id;
	};

	// Load initially when the table page called.
	$scope.initTable = function() {
		// $http.get('/proxy/lsp_grid/heading/_search??size=10000&pretty&query:matchAl').success(function(d) {
		// $http.get('/api/tableheading').success(function(d) {
		$http.get('/api/tableinfo').success(function(d) {
			$scope.defaultDataSetCopy = d.hits.hits;
			$scope.dataset = d.hits.hits;
			console.log($scope.dataset);
			$scope.evenData = [{
  "_index": "gw_info",
  "_type": "stats",
  "_id": "usden5-bbisp-gw1Outae410",
  "_score": null,
  "_source": {
    "interface": "ae410",
    "AS": "AS7922",
    "partner_type": "ISP-PAID-PEER",
    "device": "usden5-bbisp-gw1",
    "partner": "COMCAST",
    "latest_speed": 46.560232,
    "direction": "Out",
    "heading": [
      "03/03 18:37",
      "03/03 18:36",
      "03/03 18:35",
      "03/03 18:34",
      "03/03 18:33",
      "03/03 18:32",
      "03/03 18:31",
      "03/03 18:30",
      "03/03 18:29",
      "03/03 18:28",
      "03/03 18:27",
      "03/03 18:26",
      "03/03 18:25",
      "03/03 18:24",
      "03/03 18:23",
      "03/03 18:22",
      "03/03 18:21",
      "03/03 18:20",
      "03/03 18:19",
      "03/03 18:18",
      "03/03 18:17",
      "03/03 18:16",
      "03/03 18:15",
      "03/03 18:14",
      "03/03 18:13",
      "03/03 18:12",
      "03/03 18:11",
      "03/03 18:10",
      "03/03 18:09",
      "03/03 18:08",
      "03/03 18:07",
      "03/03 18:06",
      "03/03 18:05",
      "03/03 18:04",
      "03/03 18:03",
      "03/03 18:02",
      "03/03 18:01",
      "03/03 18:00",
      "03/03 17:59",
      "03/03 17:58",
      "03/03 17:57",
      "03/03 17:56",
      "03/03 17:55",
      "03/03 17:54",
      "03/03 17:53",
      "03/03 17:52",
      "03/03 17:51",
      "03/03 17:50",
      "03/03 17:49",
      "03/03 17:48",
      "03/03 17:47",
      "03/03 17:46",
      "03/03 17:45",
      "03/03 17:44",
      "03/03 17:43",
      "03/03 17:42",
      "03/03 17:41",
      "03/03 17:40",
      "03/03 17:39",
      "03/03 17:38",
      "03/03 17:37"
    ],
    "speed": 50,
    "b_w": [
      "-",
      "#E0E0E0",
      "46.560232",
      "#FFFF00",
      "42.650150",
      "#FFFF00",
      "38.174607",
      "#B1FB17",
      "41.225406",
      "#FFFF00",
      "38.853096",
      "#B1FB17",
      "40.646805",
      "#FFFF00",
      "38.591620",
      "#B1FB17",
      "34.301914",
      "#B1FB17",
      "31.206019",
      "#B1FB17",
      "35.531497",
      "#B1FB17",
      "35.598751",
      "#B1FB17",
      "32.887485",
      "#B1FB17",
      "32.510367",
      "#B1FB17",
      "35.058835",
      "#B1FB17",
      "35.431617",
      "#B1FB17",
      "35.991967",
      "#B1FB17",
      "38.013006",
      "#B1FB17",
      "39.244516",
      "#B1FB17",
      "40.978929",
      "#FFFF00",
      "34.624973",
      "#B1FB17",
      "35.478133",
      "#B1FB17",
      "37.975762",
      "#B1FB17",
      "36.454011",
      "#B1FB17",
      "35.970650",
      "#B1FB17",
      "33.995555",
      "#B1FB17",
      "34.112015",
      "#B1FB17",
      "33.271099",
      "#B1FB17",
      "33.899787",
      "#B1FB17",
      "36.848352",
      "#B1FB17",
      "37.167252",
      "#B1FB17",
      "41.029898",
      "#FFFF00",
      "41.716299",
      "#FFFF00",
      "45.687532",
      "#FFFF00",
      "45.924655",
      "#FFFF00",
      "44.498723",
      "#FFFF00",
      "42.992339",
      "#FFFF00",
      "40.144386",
      "#FFFF00",
      "38.930458",
      "#B1FB17",
      "41.191258",
      "#FFFF00",
      "41.411957",
      "#FFFF00",
      "40.460374",
      "#FFFF00",
      "38.625387",
      "#B1FB17",
      "37.350310",
      "#B1FB17",
      "35.923671",
      "#B1FB17",
      "32.916862",
      "#B1FB17",
      "32.620206",
      "#B1FB17",
      "32.798015",
      "#B1FB17",
      "34.420138",
      "#B1FB17",
      "36.271658",
      "#B1FB17",
      "37.509326",
      "#B1FB17",
      "32.796224",
      "#B1FB17",
      "34.361840",
      "#B1FB17",
      "38.096713",
      "#B1FB17",
      "40.369352",
      "#FFFF00",
      "37.753125",
      "#B1FB17",
      "37.985412",
      "#B1FB17",
      "41.397662",
      "#FFFF00",
      "39.893498",
      "#B1FB17",
      "40.265556",
      "#FFFF00",
      "37.603723",
      "#B1FB17"
    ]
  },
  "sort": [
    46.56023
  ],
  "$$hashKey": "object:12"
},{
  "_index": "gw_info",
  "_type": "stats",
  "_id": "usden5-bbisp-gw1Outae411",
  "_score": null,
  "_source": {
    "interface": "ae411",
    "AS": "AS209",
    "partner_type": "ISP-PAID-PEER",
    "device": "usden5-bbisp-gw1",
    "partner": "CENTURYLINK",
    "latest_speed": 35.865421,
    "direction": "Out",
    "heading": [
      "03/03 18:37",
      "03/03 18:36",
      "03/03 18:35",
      "03/03 18:34",
      "03/03 18:33",
      "03/03 18:32",
      "03/03 18:31",
      "03/03 18:30",
      "03/03 18:29",
      "03/03 18:28",
      "03/03 18:27",
      "03/03 18:26",
      "03/03 18:25",
      "03/03 18:24",
      "03/03 18:23",
      "03/03 18:22",
      "03/03 18:21",
      "03/03 18:20",
      "03/03 18:19",
      "03/03 18:18",
      "03/03 18:17",
      "03/03 18:16",
      "03/03 18:15",
      "03/03 18:14",
      "03/03 18:13",
      "03/03 18:12",
      "03/03 18:11",
      "03/03 18:10",
      "03/03 18:09",
      "03/03 18:08",
      "03/03 18:07",
      "03/03 18:06",
      "03/03 18:05",
      "03/03 18:04",
      "03/03 18:03",
      "03/03 18:02",
      "03/03 18:01",
      "03/03 18:00",
      "03/03 17:59",
      "03/03 17:58",
      "03/03 17:57",
      "03/03 17:56",
      "03/03 17:55",
      "03/03 17:54",
      "03/03 17:53",
      "03/03 17:52",
      "03/03 17:51",
      "03/03 17:50",
      "03/03 17:49",
      "03/03 17:48",
      "03/03 17:47",
      "03/03 17:46",
      "03/03 17:45",
      "03/03 17:44",
      "03/03 17:43",
      "03/03 17:42",
      "03/03 17:41",
      "03/03 17:40",
      "03/03 17:39",
      "03/03 17:38",
      "03/03 17:37"
    ],
    "speed": 20,
    "b_w": [
      "-",
      "#E0E0E0",
      "35.865421",
      "#B1FB17",
      "32.681653",
      "#B1FB17",
      "30.377055",
      "#B1FB17",
      "28.724389",
      "#00FF00",
      "30.222755",
      "#B1FB17",
      "29.714669",
      "#00FF00",
      "30.879295",
      "#B1FB17",
      "30.737874",
      "#B1FB17",
      "29.117689",
      "#00FF00",
      "28.490887",
      "#00FF00",
      "30.385818",
      "#B1FB17",
      "32.443309",
      "#B1FB17",
      "31.066857",
      "#B1FB17",
      "31.783965",
      "#B1FB17",
      "31.370215",
      "#B1FB17",
      "33.711723",
      "#B1FB17",
      "36.435892",
      "#B1FB17",
      "38.971574",
      "#B1FB17",
      "37.151471",
      "#B1FB17",
      "35.182202",
      "#B1FB17",
      "34.109808",
      "#B1FB17",
      "32.047455",
      "#B1FB17",
      "29.111750",
      "#00FF00",
      "26.037668",
      "#00FF00",
      "24.347860",
      "#00FF00",
      "25.816924",
      "#00FF00",
      "24.946454",
      "#00FF00",
      "24.621076",
      "#00FF00",
      "28.060800",
      "#00FF00",
      "30.640409",
      "#B1FB17",
      "33.329470",
      "#B1FB17",
      "36.239362",
      "#B1FB17",
      "36.197575",
      "#B1FB17",
      "29.979857",
      "#00FF00",
      "25.499851",
      "#00FF00",
      "24.426546",
      "#00FF00",
      "21.963299",
      "#00FF00",
      "24.156398",
      "#00FF00",
      "27.529471",
      "#00FF00",
      "29.337123",
      "#00FF00",
      "32.442067",
      "#B1FB17",
      "37.578337",
      "#B1FB17",
      "40.558691",
      "#FFFF00",
      "46.608582",
      "#FFFF00",
      "46.518934",
      "#FFFF00",
      "48.160056",
      "#FFFF00",
      "51.154705",
      "#FDD017",
      "49.857911",
      "#FFFF00",
      "48.662765",
      "#FFFF00",
      "51.007904",
      "#FDD017",
      "49.458485",
      "#FFFF00",
      "46.644786",
      "#FFFF00",
      "42.718557",
      "#FFFF00",
      "34.638877",
      "#B1FB17",
      "31.023862",
      "#B1FB17",
      "35.903979",
      "#B1FB17",
      "43.349862",
      "#FFFF00",
      "43.993988",
      "#FFFF00",
      "45.797395",
      "#FFFF00",
      "44.673836",
      "#FFFF00"
    ]
  },
  "sort": [
    35.86542
  ],
  "$$hashKey": "object:13"
}]
			// remove 'ae400' from array
   		_.remove($scope.dataset, {_source:{interface: 'ae400'}});
			_.map(d.hits.hits, function(d) {
				$scope.$watch('limit', function(limit) {
					if($scope.limit == 'All' || limit==undefined || $scope.limit > d._source.heading.length){
						$scope.limit = d._source.heading.length;
					}
					// thead (date)
					$scope.heading = _.take(d._source.heading, $scope.limit);
				});
			});
		});
		// $http.get('/proxy/lsp_grid/stats/_search?size=10000&pretty&query:matchAll').success(function(d) {
		$http.get('/api/tablestats').success(function(d) {
			$scope.tableStats = d.hits.hits;
		});
	};

	// Get the b_w values in new line each			   
 	$scope.getDescValue = function(v) {
		$scope.isLoading = true;
		var values = [],colorCode = [];
		var descriptionValue = _.filter(v, function(d) {
			if(d.indexOf("#") != 0)
				values.push(d);
			else
				colorCode.push(d)
		});

		var limitColorCode = _.take(colorCode, $scope.limit);
		var limitvalues = _.take(values, $scope.limit);
		$scope.colors = limitColorCode;
		return limitvalues;
		$scope.isLoading = false;
	}

	$scope.getDescValue1 = function(d, i,v) {
	
 	// 	var values = [],colorCode = [];
		// var descriptionValue = _.filter(v, function(d) {
		// 	if(d.indexOf("#") != 0)
		// 		values.push(d);
		// 	else
		// 		colorCode.push(d)
		// });
		// $scope.colors = colorCode;
		// return values;
	}

	$scope.watchDirDropDown = function(d) {
		var dirData;
		$scope.dataset = $scope.defaultDataSetCopy;
		if(d.dir == 'In'){
			dirData =_.filter($scope.dataset, {_source:{direction: d.dir}});
			return $scope.dataset = dirData;
		}
		$scope.dataset = $scope.defaultDataSetCopy;
		if(d.dir == 'Out'){
			console.log(dirData);
			dirData = _.filter($scope.dataset, {_source:{direction: d.dir}});
			return $scope.dataset = dirData;
		}
		$scope.dataset = $scope.defaultDataSetCopy;
		if(d.dir == 'Default') {
			$scope.dataset = $scope.defaultDataSetCopy;
		}
	};

	// Get the values of table status
	// $scope.getTableStats = function(ts) {
	// 	$scope.isLoading = true;
	// 	return ts;
	// 	$scope.isLoading = false;
	// };
});

/*  Mar 06 */

// cdnDashboard.controller('ServerHealthController', function($scope, es) {
//   es.cluster.health(function (err, resp) {
//     if (err) {
//     	$scope.data = err.message;
//     } else {
//       $scope.data = resp;
//     }
//   });
// });
// cdnDashboard.service('es', function (esFactory) {
//   return esFactory({ host:  'http://10.12.22.10:9200/'
//  });
// });
// cdnDashboard.controller('tableController', function($scope, $http,$timeout,es) {
// 	$scope.isCollapsed = true;
// 	$scope.initTableController = function() {
// 		$http.get('/proxy/gw_info/stats/_search?pretty&size=100&sort=latest_speed:desc').success(function(d){
//    		$scope.dataset = d.hits.hits;
//    		_.remove($scope.dataset, {_source:{interface: 'ae400'}});
//    		// var res = [];   		
//    		// console.log(d.hits.hits._source.partner,d.hits.hits._source.AS,d.hits.hits._source.partner_type,d.hits.hits._source.speed,d.hits.hits._source.direction);
//       $scope.dataset.forEach(function(d){
//    	  	var deviceName = d._source.device.replace(/-/g,'_');
//   	   	var interface = d._source.interface;
//   	   	var label1 = [];
//   	   	var statSource = d._source;
//   	   	//Elatic query
//       	es.search({
// 					index: 'desc_map',
// 					type: 'config',
// 					size: 10000,
// 					body: {
// 						"query": 
// 					  	{"bool": 
// 					     	{"must": 
// 				         	[
// 				         		{"match":
// 			             		{"device":deviceName}
// 			            	},
// 		              	{"match":
//                   		{"intf": interface}
// 		                }
//                  	]
// 	             	}
// 		         	}
// 			    }
// 				}).then(function (response) {
// 					// console.log("Response", response);
// 					if(response.hits.hits.length > 0) {
// 						_.map(response.hits.hits, function(d) {
// 							var label = "mpls"+d._source.label,
// 								device = d._source.device,
// 								intf = d._source.intf;
// 							compareLabel(label,device,intf,statSource);
// 						});
// 					} else {
// 							// label1.push("No Hits Found");
// 							console.log("No Labels Found");
// 					}
					
// 				});
// 				// console.log("No Label1s : ",label1);
//   		});
//   		function compareLabel(l, dev, i,cb) {
//   			// console.log(l,dev,i,cb);
//   			var fTime = [];
//   			var fBps = [];
//   			$scope.newObj = [];
// 	  		$http.get('/proxy/testing52/cdnstats/_search?size=100&q=hostip:all&sort=time:desc').success(function(d){
// 					var dHits = d.hits.hits;
// 					// console.log(dHits.length);
// 					$scope.fiilteredData = [];
// 						_.map(dHits, function(_src) {
// 							var time = moment(new Date(_src._source.time*1000));
// 							var monthnday = time.format('MM/DD, H:mm');
// 							_.map(_src._source.IntfRawTrend, function(name) {
// 								if(name.intfname == l) {
// 									fTime.push(monthnday);
// 									fBps.push(name.bps);
// 									// $scope.fiilteredData.push(
// 									// 	{
// 									// 		_source: {
// 									// 			device: dev,
// 									// 			interface: i,
// 									// 			partner: "partner",
// 									// 			AS: "AS",
// 									// 			partner_type: "partner_type",
// 									// 			speed: "speed",
// 									// 			direction: "direction",
// 									// 			intfname:name.intfname,
// 									// 			bps:name.bps,
// 									// 			b_w: [
// 									// 				"1",
// 									// 				"2",
// 									// 				"3"
// 									// 			]
// 									// 		}
// 									// 	}
// 									// );
// 								}
// 							});
// 						});
// 						$scope.newObj.push({
// 							_source: {
// 								device: dev,
// 								interface: i,
// 								partner: cb.partner,
// 								AS: cb.AS,
// 								partner_type: cb.partner_type,
// 								speed: cb.speed,
// 								direction: cb.direction,
// 								time: fTime,
// 								b_w: fBps.toString().split(",")
// 							}
// 						});
// 	    	});
//   		}
//      	$scope.totalItems = $scope.dataset.length;
//      	_.map(d.hits.hits, function(d) {
// 				$scope.valueLength = d._source.b_w.length/2;
// 				$scope.heading = d._source.heading;
// 				// console.log($scope.heading);
// 			});
// 			// check Readio Buttons
// 			$scope.checkRadioButton = function(value) {
// 				var datasetCopy = angular.copy($scope.dataset);
// 				if(value == "default"){
// 					console.log(value);
// 					// $scope.value = value;
// 					$scope.dataset = datasetCopy;
// 				}else{
// 					// console.log(value);
// 					$scope.value = value;
// 					$scope.filHeading = $scope.newObj[0]._source.time;
// 					$scope.filDataset=$scope.newObj;
// 				}
// 			};
// 			// set default value for radio button
// 			$scope.radio = {
// 				"value": "default"
// 			}
//     });
// 	};


// // Get the b_w values in new line each			   
//  	$scope.getDescValue = function(v) {
// 		$scope.isLoading = true;
// 		var values = [],colorCode = [];
// 		var descriptionValue = _.filter(v, function(d) {
// 			if(d.indexOf("#") != 0)
// 				values.push(d);
// 			else
// 				colorCode.push(d)
// 		});

// 		$scope.colors = colorCode;
// 		return values;
// 		$scope.isLoading = false;
// 	}
// });