var ngElastic = angular.module('ngElastic',['ngRoute', 'ui.bootstrap']);

ngElastic.filter('wildcard', function() {

  return function(list, value) {
   
    if (!value) {
      return list;
    }

    var escaped = value.replace(/([.+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    var formatted = escaped.replace('*', '.*')

    if (formatted.indexOf('*') === -1) {
      formatted = '.*' + formatted + '.*'
    }

    var output = []

    angular.forEach(list, function(item) {
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
})

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
		otherwise({
			redirectTo: '/'
		});

	// Remove hash(#) from Url
	// $locationProvider.html5Mode({
	// 	enabled: true,
 //  		requireBase: false
	// });
}]);

ngElastic.controller('mainController', function($scope, $http) {
	$scope.findIP = function() {
		// var url = 'http://10.12.21.14:9200/mpls_lsps/_search?search_type=count&pretty&source={%22aggregations%22:{%22states%22:{%22terms%22:{%22field%22:%22router_name%22},%22aggs%22:{%22hits%22:{%22top_hits%22:{%22size%22:1}}}}}}';
		$http.get('/api/routes').success(function(data) {
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
			data.hits.hits.map(function(d,i){
				// console.log(d._source.new_config[d._id]);
				$scope.newConfig = d._source.new_config[d._id].join('\n');
			});
     	}).error(function(err) {
			console.log(err.message);
		});
	}

	// send POST Request
	$scope.postData = function(d) {
		// console.log(d);
        $scope.routerInfo = {
			Router_name: d._source.router_name,
			LSP_name: d._id,
			Hops: d._source.existing_config,
			NodeSeq: d._source.new_config
		};
		$scope.anotherRouteInfo = {
			router_name: d._source.router_name,
			router_address: d._source.router_address,
			new_config: d._source.new_config
		};
		$http.post('/api/applyanother', $scope.anotherRouteInfo).success(function(res) {
			toastr.error("Posted Success");
		}).error(function(res) {
			toastr.info('Internal server error in another Router');
		});
		$http.post('/api/apply', $scope.routerInfo).success(function(response) {
			toastr.success('Posted Successfully');
		}).error(function(res) {
         	toastr.error('Internal Server Error');
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
		angular.forEach($scope.data, function(d) {
			if(!d.isSelected) {
				// console.log(d);
				newDataList.push(d);
			}else{
				$scope.postData(d);
			}
		});
		$scope.data = newDataList;
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
ngElastic.controller('tabController', function($scope, $http, $uibModal, $log) {
	$scope.isCollapsed = true;
	$scope.tabInit = function() {
		$http.get('/api/logs').success(function(data) {
			$scope.routes = data.hits.hits;
		}).error(function(err) {
			console.log("Error loading data");
		});
	};
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
ngElastic.controller('statusController', function($scope, $http) {
	$scope.isCollapsed = true;
	$scope.loadStatus = function() {
		$http.get('/api/status').success(function(data) {
			$scope.status = data.hits.hits;
		}).error(function(e) {
			console.log(e.message);
		});
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