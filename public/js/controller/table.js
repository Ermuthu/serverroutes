ngElastic.controller('tableController', function($scope, $http, DTOptionsBuilder) {
 	var vm = this;
  vm.dtOptions = DTOptionsBuilder.newOptions()
    // .withOption('scrollCollapse', true)
    .withOption('searching', false)
    .withOption('ordering', false)
    .withOption('bInfo', false)
    .withOption('paging', false)
    .withOption('scrollY', '300px')
    .withOption('scrollX', true)
    .withFixedColumns({
      leftColumns: 2
    });
	// Title
	$scope.table = "Table";

	// sidebar dummy data
	$scope.sidebarList = ["krsel6-bbisp-gw1", "jptyo5-bbisp-gw2", "hkhkg1-bbisp-gw2", "ussea4-bb-cr1", "usqas3-bb-pe1"];
	$scope.fixedTableHeader = ["Partner (AS)", "Device: Interface", "Partner Type", "Capacity (Gbps)"]

	// set flag for expand/collapse
 	$scope.isCollapsed = true;
  $scope.isCollapseMpls = true;

	// set value for limit dropdown
	$scope.setLimit = [{id:5},{id:30},{id:'All'}];

	// set value for dir dropdown
	// $scope.setDir = [{dir:'In',},{dir:'Out'},{dir:'Default'}];
	$scope.setDir = [{ "value": "primary", "text": "1st" }, { "value": "secondary", "text": "2nd" }];

	$scope.limit = 5;

	// Default radio button
	$scope.radio = {
		"value": "default"
	};

	// change limit value as per user limit (dropdown)
	$scope.findLimit = function(res) {
		$scope.limit = res.id;
	};

	// Load initially when the table page called.
	$scope.initTable = function() {
		var lteArray = [];
		// $http.get('/proxy/lsp_grid/heading/_search??size=10000&pretty&query:matchAl').success(function(d) {
		// $http.get('/api/tableheading').success(function(d) {
		$http.get('/api/tableinfo').success(function(d) {
			$scope.defaultDataSetCopy = d.hits.hits;
			$scope.dataset = d.hits.hits;

			// remove 'ae400' from array
   		_.remove($scope.dataset, {_source:{interface: 'ae400'}});

   		// Partner and Partner Type Dropdown 
			var partnerDropDown = [],
				partnerTypeDropDown = [];
			_.map($scope.dataset, function(pdata) {
				partnerDropDown.push(pdata._source.partner);
				partnerTypeDropDown.push(pdata._source.partner_type);
			});
			$scope.partnerDropDown = _.uniq(partnerDropDown);
			$scope.partnerTypeDropDown = _.uniq(partnerTypeDropDown);

			// 
			_.map($scope.dataset, function(d){
   		 	$scope.Limit = d._source.partner
   		 	var lteTime = d._source.heading[0];
		    lteArray.push(lteTime);
		    lt = _.first(lteArray);
   	  	var deviceName = d._source.device.replace(/-/g,'_'),
  	   		interface = d._source.interface,
	   		 	speedd = d._source.speed,
  	   		statSource = d._source;
				// console.log("$scope.dataset",$scope.newObjectOdd);
  		});
  		_.map($scope.dataset, function(d) {
				$scope.$watch('limit', function(limit) {
					if($scope.limit == 'All' || limit==undefined || $scope.limit > d._source.heading.length){
						$scope.limit = d._source.heading.length;
						// $scope.heading = _.take(d._source.heading, $scope.limit);
						$scope.heading = _.take(d._source.heading, 30);
					}});
					// thead (date)
					// $scope.heading = _.take(d._source.heading, $scope.limit);
					$scope.heading = _.take(d._source.heading, 30);
				// });
			});
		});

		// watch limit
		// _.map($scope.dataset, function(d) {
		// 	$scope.$watch('limit', function(limit) {
		// 		console.log("$scope.radio.value");
		// 		if($scope.limit == 'All' || limit==undefined || $scope.limit > d._source.heading.length){
		// 			$scope.limit = d._source.heading.length;
		// 		}});
		// 		// thead (date)
		// 		$scope.heading = _.take(d._source.heading, $scope.limit);
		// 		console.log($scope.heading);
		// 	// });
		// });
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

	// Direction Dropdown
	$scope.watchDirDropDown = function(d) {
		console.log(d);
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

	// Partner Dropdown
	$scope.partnerDrDown = function(partner) {
		var filteredPartnerDropDown;
		$scope.dataset = $scope.defaultDataSetCopy;
		if(partner != undefined){
			filteredPartnerDropDown = _.filter($scope.dataset, {_source:{partner: partner}});
			return $scope.dataset = filteredPartnerDropDown;
		}
		$scope.dataset = $scope.defaultDataSetCopy;
	};

	// Partner Type Dropdown
	$scope.partnerTypeDrDown = function(partnerType) {
		var filteredPartnerTypeDropDown;
		$scope.dataset = $scope.defaultDataSetCopy;
		if(partnerType != undefined){
			filteredPartnerTypeDropDown = _.filter($scope.dataset, {_source:{partner_type: partnerType}});
			return $scope.dataset = filteredPartnerTypeDropDown;
		}
		$scope.dataset = $scope.defaultDataSetCopy;
	};

	$scope.mergeCol = function(c1, c2, c3) {
		var mixCols;
		if(c3 == 'c1')
			mixCols = _.concat(c1+' ('+c2+')');
		else
			mixCols = _.concat(c1+': '+c2);
		return mixCols;
	}

	// Reset All Filter
	$scope.resetAll = function() {
		$scope.dataset = $scope.defaultDataSetCopy;
	}

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
	// $scope.initTableController = function() {
	// 	$http.get('/proxy/gw_info/stats/_search?pretty&size=100&sort=latest_speed:desc').success(function(d){
 //   		$scope.dataset = d.hits.hits;
 //   		_.remove($scope.dataset, {_source:{interface: 'ae400'}});
 //   		// var res = [];   		
 //   		// console.log(d.hits.hits._source.partner,d.hits.hits._source.AS,d.hits.hits._source.partner_type,d.hits.hits._source.speed,d.hits.hits._source.direction);
 //      $scope.dataset.forEach(function(d){
 //   	  	var deviceName = d._source.device.replace(/-/g,'_');
 //  	   	var interface = d._source.interface;
 //  	   	var label1 = [];
 //  	   	var statSource = d._source;
 //  	   	//Elatic query
 //      	es.search({
	// 				index: 'desc_map',
	// 				type: 'config',
	// 				size: 10000,
	// 				body: {
	// 					"query": 
	// 				  	{"bool": 
	// 				     	{"must": 
	// 			         	[
	// 			         		{"match":
	// 		             		{"device":deviceName}
	// 		            	},
	// 	              	{"match":
 //                  		{"intf": interface}
	// 	                }
 //                 	]
	//              	}
	// 	         	}
	// 		    }
	// 			}).then(function (response) {
	// 				// console.log("Response", response);
	// 				if(response.hits.hits.length > 0) {
	// 					_.map(response.hits.hits, function(d) {
	// 						var label = "mpls"+d._source.label,
	// 							device = d._source.device,
	// 							intf = d._source.intf;
	// 						compareLabel(label,device,intf,statSource);
	// 					});
	// 				} else {
	// 						// label1.push("No Hits Found");
	// 						console.log("No Labels Found");
	// 				}
					
	// 			});
	// 			// console.log("No Label1s : ",label1);
 //  		});
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
