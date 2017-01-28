var ngElastic = angular.module('ngElastic',['ngRoute', 'nvd3', 'ui.bootstrap']);
// ngElastic.controller('statusController', statusController);
ngElastic.filter('typesFilter', function() {
   return function(clients, selectedCompany) {
   		if (!angular.isUndefined(clients) && !angular.isUndefined(selectedCompany) && selectedCompany.length > 0) {
   			var tempClients = [];
            angular.forEach(selectedCompany, function (id) {
            	console.log("ID",id);
                angular.forEach(clients, function (client) {
                	console.log("Type",client._source.path_type);
                	console.log("ID",id);
                    if (angular.equals(client._source.path_type, id)) {
                    	console.log(("If"));
                        tempClients.push(client);
                    }
                });
            });
            console.log(tempClients);
            return tempClients;
   		}else{
   			return clients;
   		}
    };
});

// return function (clients, selectedCompany) {
//         if (!angular.isUndefined(clients) && !angular.isUndefined(selectedCompany) && selectedCompany.length > 0) {
//             var tempClients = [];
//             angular.forEach(selectedCompany, function (id) {
//                 angular.forEach(clients, function (client) {
//                     if (angular.equals(client.company.id, id)) {
//                         tempClients.push(client);
//                     }
//                 });
//             });
//             return tempClients;
//         } else {
//             return clients;
//         }
//     };
// ngElastic.filter('typesFilter', function() {
//    return function(files, types) {
//     	return files.filter(function(file) {
//           if(types.indexOf(file._source.path_type) > -1){
//           	console.log("if");
//           	return true;
//           }else{
//           	console.log("else");
//           	return false;
//           }
//         });
//     };
// });
ngElastic.factory('lineChartService', function($http){
    return {
        getdata: function(){
          	return $http.get('/api/linechart'); // You Have to give Correct Url either Local path or api etc 
        }
    };
});
ngElastic.filter('wildcard', function() {

  return function(list, value) {
    if (!value) {
      return list;
    }

    var escaped = value.replace(/([.+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    var formatted = escaped.replace('*', '.*')

    if (formatted.indexOf('*') === -1 || openb.indexOf('(') === -1 || closeb.indexOf(')') === -1) {
      formatted = '.*' + formatted + '.*'
    }

    var output = []

    angular.forEach(list, function(item) {
		console.log(formatted);
      	var regex = new RegExp('^' + formatted + '$', 'im');
      	if (traverse(item, regex)) {
        	output.push(item);
      	}
    });
    return output
  }

  function traverse(item, regex) {
    for (var prop in item) {

      //angular property like hash
      if(prop[0] === '$$'){
        return;  
      }
      
      var value = item[prop];
      
      if (typeof value === 'object') {
        traverse(value, regex);
      }

      if(regex.test(value)){
        return true;
      }
    }
  }
});

ngElastic.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	// Router
	$routeProvider.
		when('/', {
			templateUrl: 'views/routes.html',
			controller: 'mainController'
		}).
		when('/routes', {
			templateUrl: 'views/routes.html',
			controller: 'mainController'
		}).
		when('/route/:routename', {
			templateUrl: 'views/ip.html',
			controller: 'ipController'
		}).
		when('/logs', {
			templateUrl: 'views/logs.html',
			controller: 'tabController'
		}).
		when('/status', {
			templateUrl: 'views/status.html',
			controller: 'statusController'
		}).
		when('/404', {
			templateUrl: 'views/404.html',
			controller: 'notFound'
		}).
		when('/regex', {
      		templateUrl: 'views/regex.html',
      		controller: 'regexController'
    	}).
		otherwise({
			redirectTo: '/'
		});

	// Remove hash(#) from Url
	// $locationProvider.html5Mode({
	// 	enabled: true,
 //  		requireBase: false
	// });
}]);

ngElastic.controller('regexController', function($scope, $http) {
  $scope.init = function() {
    $http.get('https://jsonplaceholder.typicode.com/users/').success(function(data) {
    // $http.get('/api/status').success(function(data) {
      $scope.result = data;
      // result.map(fun)
      // console.log(result);
    }).error(function(e) {
      console.log(e);
    });
  }
});

ngElastic.controller('mainController', function($scope, $http) {
	$scope.findIP = function() {
		// var url = 'http://10.12.21.14:9200/mpls_lsps/_search?search_type=count&pretty&source={%22aggregations%22:{%22states%22:{%22terms%22:{%22field%22:%22router_name%22},%22aggs%22:{%22hits%22:{%22top_hits%22:{%22size%22:1}}}}}}';
		$http.get('/proxy/api/routes').success(function(data) {
			$scope.routes = data.aggregations.states.buckets;
			var extractData =  data.aggregations.states.buckets.map(function(data) {
				$scope.total = data.doc_count;
			});
		}).error(function(err) {
			console.log(err.message);
		});
	};
});

ngElastic.controller('ipController', function($scope, $http, $routeParams) {
	// Load Initial Data
	// var url = 'http://10.12.21.14:9200/mpls_lsps/_search?q=_id:'+$routeParams.id+'&pretty=true';
	$scope.init = function() {
		$http.get('/api/route/'+$routeParams.routername).success(function(data) {
			$scope.data = data.hits.hits;
     	}).error(function(err) {
			console.log(err.message);
		});
	}

	// send POST Request
	$scope.postData = function(d) {
		// console.log({"d": d});
		$scope.routerInfo = {"LSPS": d};
		$http.post('/api/applyanother', $scope.routerInfo).success(function(res) {
			toastr.success("Posted Success");
		}).error(function(res) {
			toastr.info('Internal server error in another Router');
		});
	};

	$scope.checkbox = {};
	$scope.checkbox.selectAll = false;
	$scope.search = {};
	$scope.search.name = '';

	$scope.searchParams = function() {
    
  	};
  	$scope.selectAllFiltered = function() {
    	if ($scope.checkbox.selectAll) {
      		$scope.checkbox.selectAll = false;
    	} else {
      		$scope.checkbox.selectAll = true;
    	}
    
    	if (!$scope.search.name) {
      		for (var i = 0; i < $scope.data.length; i++) {
      			// console.log($scope.data[i].isSelected);
        		if (angular.isUndefined($scope.data[i].isSelected)) {
        			// console.log('if');
          			$scope.data[i].isSelected = $scope.checkbox.selectAll;
        		} else {
          			$scope.data[i].isSelected = !$scope.data[i].isSelected;
        		}
      		}
    	} else {
      		for (var i = 0; i < $scope.filtered.length; i++) {
        		if (angular.isUndefined($scope.filtered[i].isSelected)) {
          			$scope.filtered[i].isSelected = $scope.checkbox.selectAll;
        		} else {
          			$scope.filtered[i].isSelected = !$scope.filtered[i].isSelected;
        		}
      		}
    	}
  	}

  	$scope.unCheckAll = function() {
  		angular.forEach($scope.data, function(d) {
	    	d.isSelected = false;
		});
  	}

	// remove selected routes
	$scope.apply = function() {
		var newDataList = [];
		var postData = [];
		angular.forEach($scope.data, function(d) {
			if(!d.isSelected) {
				// console.log(d);
				newDataList.push(d);
			}else{
				console.log("else");
				postData.push(d);
				// $scope.postData(d);
			}
		});
		$scope.data = newDataList;
		$scope.postData(postData);
	};

	// checkAll the routes
	$scope.checkAll = function() {
		angular.forEach($scope.data, function(data) {
			data.isDelete = $scope.selectAll;
		});
	};

	// function escapeRegExp(string) {
 //  		return string.replace(/([.+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	// }

	// $scope.textSearch = '';
 //  	var regex;
 //  	$scope.$watch('textSearch', function(value) {
 //  		console.log(value);
 //    	var escaped = escapeRegExp(value);
 //    	var formatted = escaped.replace('*', '.*');
 //    	if(formatted.indexOf('*') === -1){
 //    		formatted = '.*' + formatted + '.*'
 //    	}
 //    	regex = new RegExp('^' + formatted + '$', 'im');
 //  	});

 //  	$scope.filterBySearch = function(dataItem) {
 //    	if (!$scope.textSearch) return true;
 //    	return regex.test(dataItem);
 //  	};
});

// $scope.testing = "FROM-DLNYC3-BBISP-GW2-TO-DL";
// ngElastic.filter('myfilter', function() {
// 	return function( items, types) {
//     	var filtered = [];
//     	angular.forEach(items, function(item) {
//     		// console.log(item._id);
//        		if(item._id.match(/^FROM-DLNYC3-BBISP-GW2-TO-DL.*$/)) {
//           		filtered.push(item);
//     		}
//     	});
//     	return filtered;
//   	};
// });	


// TabController
ngElastic.controller('tabController', function($scope, $http, $uibModal, lineChartService, $interval) {
	// Line chart
	$scope.isCollapsed = true;
	$scope.tabInit = function() {
		$http.get('/api/logs').success(function(data) {
			$scope.routes = data.hits.hits;
		}).error(function(err) {
			console.log("Error loading data");
		});
	};
	$scope.options = {
        chart: {
            type: 'lineChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 75
            },
            // tooltip:{
            // 	enabled: false
            // },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            // useInteractiveGuideline: false,
            dispatch: {
              tooltipShow: function(e){ console.log('! tooltip SHOW !')},
              tooltipHide: function(e){console.log('! tooltip HIDE !')},
              beforeUpdate: function(e){ console.log('! before UPDATE !')}
            },
            xAxis: {
                axisLabel: 'Time',
                tickFormat: function(d) {
            		return d3.time.format('%d/%b %H:%M')(new Date(d * 1000));
                }
            },
            yAxis: {
                axisLabel: 'Timetaken'
            }
        }
    };
    $scope.data = sinAndCos();
    $scope.callback = function(scope, element){
    	// Add a click event
    	d3.selectAll('.nv-point-paths').on('click', function(e){
      		d3.selectAll('.nvtooltip').each(function(){
          		this.style.setProperty('display', 'block', 'important');
      	});
    	});
    	// Clear tooltip on mouseout
    	d3.selectAll('.nv-point-paths').each(function(){
      		this.addEventListener('mouseout', function(){
          		d3.selectAll('.nvtooltip').each(function(){
              		this.style.setProperty('display', 'none', 'important');
          		});
      		}, false);
		});
		d3.selectAll('.nv-point-paths').each(function(){
      		this.addEventListener('mouseover', function(){
          		d3.selectAll('.nvtooltip').each(function(){
              		this.style.setProperty('display', 'none', 'important');
          		});
      		}, false);
		});
	    // we use foreach and event listener because the on('mouseout')
	    // was overidding some other function
  };

    function lineChartDatas() {
    	var chartInput = [];
    	$http.get('/api/linechart').success(function(d) {
    		var hits = d.hits.hits;
    		_.map(hits, function(d) {
    			chartInput.push({
    				x: new Date(d._source.received_ts).getTime(),
    				router_name: d._source.router_name,
    				y: d._source.time_taken
    			});
    		});
    	}).error(function(err) {

    	});
    	return [
    		{
    			values: chartInput,
    			key: 'Router', //key  - the name of the series.
                color: '#ff7f0e'  //color - optional: choose your own line color.
    		}
    	];
    }

    function sinAndCos() {
        var sin = [],sin2 = [],
            cos = [];

        //Data is represented as an array of {x,y} pairs.
        for (var i = 0; i < 100; i++) {
            sin.push({x: i, y: Math.sin(i/10)});
            sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
            cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
        }

        //Line chart data should be sent as an array of series objects.
        return [
            {
                values: sin,      //values - represents the array of {x,y} data points
                key: 'Sine Wave', //key  - the name of the series.
                color: '#ff7f0e',  //color - optional: choose your own line color.
                strokeWidth: 2,
                classed: 'dashed'
            }
        ];
    };

	$scope.lineChar = function() {
		$scope.values = [];
		$scope.router_name = [];
		$scope.slotsLength = [];
		lineChartService.getdata().success(function(d) {
	   //      for (var i=0; i<d.hits.hits.length; i++) {
	   //          $scope.slotsLength.push({
	   //          	x: new Date(d._source.received_ts[i]).getTime(),
				// 	y: d._source.time_taken[i]
				// });
	   //      }
			d.hits.hits.map(function(d) {
				// console.log(d);
				// $scope.values.push({
				// 	x: new Date(d._source.received_ts).getTime(),
				// 	y: d._source.time_taken
				// });
				$scope.axisData = [new Date(d._source.received_ts).getTime(),d._source.time_taken]
				$scope.values.push($scope.axisData);
				$scope.router_name.push(d._source.router_name);
			});
			// console.log($scope.values);
			// console.log($scope.values);
			$scope.lineChartData = [
		     	{
		        	"key": "Series 1",
		        	"values": $scope.values,
		        	"router_name": $scope.router_name
		 		}
		 	];
		});
		// $scope.lineChartData = $scope.values;
		// console.log("Length : ",$scope.slotsLength);
	}
	var difference,
		daysDifference,
		hoursDifference,
		minutesDifference,
		secondsDifference;
	$scope.timeDifference = function(date1,date2) {
    	difference = date2 - date1;
        daysDifference = Math.floor(difference/1000/60/60/24);
        difference -= daysDifference*1000*60*60*24
       	hoursDifference = Math.floor(difference/1000/60/60);
        difference -= hoursDifference*1000*60*60
        minutesDifference = Math.floor(difference/1000/60);
        difference -= minutesDifference*1000*60
        secondsDifference = Math.floor(difference/1000);
		// console.log('difference = ' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ');
 	}
 	$scope.timeDifference($scope.date1, $scope.date2);
	// $scope.showModal = function(d) {
	// 	if(d == "")
	// 		$scope.remarks = "No Remarks"
	// 	else
	// 		$scope.remarks = d;
	// 	var modalInstance = $uibModal.open({
	// 		templateUrl: 'myModalContent.html',
	// 		controller: 'ModalInstanceCtrl',
	// 		size: 'sm',
	// 		resolve: {
	// 	        remarks: function(){
	// 	          	return $scope.remarks
	// 	        }
	//       	}
	// 	});
	// }
});

// statusController
// function statusController($scope, $http) {
ngElastic.controller('statusController', function($scope, $http) {
	// $scope.emailPattern = /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/;
	$scope.emailPattern = (/['"]+/g, '');
	function escapeRegExp(string) {
  		return string.replace(/([.+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	$scope.addPTag = function(sConfig) {
		return sConfig;
	}
  	$scope.getText = function(label){
    	if(label != undefined)
			return label.split('$');
  	}
  	$scope.adminGroupPrimary = function(agp) {
  		if(agp != undefined) {
  			var removeWhiteSpaces = agp.replace(/\s+/g, ' ').trim(),
  				removespechar = removeWhiteSpaces.replace(/[.*+?^{}'()|[\]\\]/g, "");
  			return removespechar.split('$');
  		}
  	}
  	$scope.adminGroupSecondary = function(agp) {
  		if(agp != undefined) {
  			var removeWhiteSpaces = agp.replace(/\s+/g, ' ').trim(),
  				removespechar = removeWhiteSpaces.replace(/[.*+?^{}'()|[\]\\]/g, "");
  			return removespechar.split('$');
  		}
  	}
	// $scope.getText = function(obj){
	// 	console.log(obj.replace(/,/g, '\n'));
	// 	return obj.replace(/,/g, '\n');
	// 	// var text = obj.replace(/['"]+/g, '');
	// 	// console.log(text.split(",").join("\n"));
	// 	// console.log(obj.split(' "').join('\n'));
	// 	// return obj.replace(/['"]+/g, '\n');
 //    	// var text = obj.replace(/['"]+/g, '');
 //    	// return text.split(", ").join("\n");
 //    	// return text.split(",").join("<br />");
 //  	};
	$scope.isCollapsed = true;
	$scope.selectedCompany = [];
	$scope.loadStatus = function() {
		$http.get('/api/status').success(function(data) {
			$scope.status = data.hits.hits;
			console.log($scope.status.length);
			// $scope.status.map(function(d) {
			// 	console.log(d._source.path_type);
			// });
			//Time Difference
			$scope.status.map(function(d){
				//variable declaration
				if(d._source.applied_timestamp != undefined)
					return $scope.config_applied_time = new Date(d._source.applied_timestamp*1000);
				var now = new Date();
					then  = new Date(d._source.running_timestamp*1000),
					diff = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss")),
					duration = moment.duration(diff),
					ss = Math.floor(duration.asHours()) + moment.utc(diff).format(":mm:ss"),
					hour = Math.floor(duration.asHours()),
					min = Math.floor(duration.asMinutes()),
					sec = Math.floor(duration.asSeconds());
				// check for higher grade
				$scope.updated_date = then;
				if(hour > 0)
					$scope.last_updated_time = hour + ' Hours ago';
				else if(min > 0)
					$scope.last_updated_time = min + ' Minutes ago';
				else if(min < 0 && sec > 0)
					$scope.last_updated_time = sec + ' Seconds ago';
				else
					$scope.last_updated_time = 'Time is up to date';
            });
		}).error(function(e) {
			console.log(e);
		});
		// $scope.toggleSelection = function toggleSelection(type) {
		// 	console.log(type);
		// 	_.filter($scope.status, function(o) { 
		// 		// console.log(o._source.path_type );
		// 		if(o._source.path_type == type){
		// 			$scope.selectedItems.push(o);
		// 		}
		// 	});
		// }
		// $scope.selectedTypes = [];
		$scope.toggleSelection = function toggleSelection(type) {
	    	var idx = $scope.selectedCompany.indexOf(type);
	      	if (idx > -1) {
	        	$scope.selectedCompany.splice(idx, 1);
	      	}else {
	        	$scope.selectedCompany.push(type);
	      	}
	      	console.log($scope.selectedCompany);
	    };  
	};
});

// For Modal
// ngElastic.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, remarks) {

//   $scope.remarks = remarks;

//   $scope.ok = function () {
//     $uibModalInstance.close($scope.remarks);
//   };

//   $scope.cancel = function () {
//     $uibModalInstance.dismiss('cancel');
//   };
// });

// notFound Controller
ngElastic.controller('notFound', function($scope) {
	$scope.title = "Not FOUND";
});