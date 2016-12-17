var ngElastic = angular.module('ngElastic',['ngRoute', 'ui.bootstrap']);

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
		// $http.get('/api/id').success(function(ids) {
		// 	$scope.routes = ids.hits.hits;
		// }).error(function(err) {
		// 	console.log(err.message);
		// });
		// var url = 'http://10.12.21.14:9200/mpls_lsps/_search?search_type=count&pretty&source={%22aggregations%22:{%22states%22:{%22terms%22:{%22field%22:%22router_name%22},%22aggs%22:{%22hits%22:{%22top_hits%22:{%22size%22:1}}}}}}';
		$http.get('/api/routes').success(function(data) {
			$scope.routes = data.aggregations.states.buckets;
			var extractData =  data.aggregations.states.buckets.map(function(data) {
				// console.log(data);
				$scope.total = data.doc_count;
				// $scope.routes = data;
				// console.log($scope.routes);
			});
		}).error(function(err) {
			console.log(err.message);
		});
	};
});

ngElastic.controller('ipController', function($scope, $http, $routeParams) {
	// $http.get('/api/id/'+ $routeParams.id).success(function(data) {
	// 	$scope.data = data;
	// 	for (var i in data._source.existing_config){
	//     	$scope.router_name = i;
	//     	$scope.existing_config = data._source.existing_config[i];
	// 	}
	// 	for (var i in data._source.new_config){
	//     	$scope.new_config = data._source.new_config[i];
	// 	}
	// }).error(function(err) {
	// 	console.log(err.message);
	// });
	// var url = 'http://10.12.21.14:9200/mpls_lsps/_search?q=_id:'+$routeParams.id+'&pretty=true';
	$scope.init = function() {
		$http.get('/api/route/'+$routeParams.routername).success(function(data) {
			$scope.data = data.hits.hits;
     	}).error(function(err) {
			console.log(err.message);
		});
	}
	// $scope.postData = function(req, res) {
	// 	var routerInfo = {
	// 		Router_name: $scope.data._source.router_name,
	// 		LSP_name: $scope.data._id,
	// 		Hops: $scope.existing_config,
	// 		NodeSeq: $scope.new_config
	// 	};
	// 	var Result = {config: routerInfo};
	// 	$http.post('/api/apply', Result).success(function(response) {
	// 		console.log("Posted");
	// 	}).error(function(res) {
	// 		console.log(res.message);
	// 	});
	// };
	$scope.postData = function(i, d) {
		// var routerInfo = {
		// 	Router_name: $scope.data._source.router_name,
		// 	LSP_name: $scope.data._id,
		// 	Hops: $scope.existing_config,
		// 	NodeSeq: $scope.new_config
		// };
		// console.log(d);
		// $scope.data.forEach(function(d) {
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
		// });
		console.log($scope.routerInfo);
		console.log($scope.anotherRouteInfo);
		$http.post('/api/applyanother', $scope.anotherRouteInfo).success(function(res) {
			console.log("posting another Router");
			toastr.error("Posted Success");
		}).error(function(res) {
			console.log(res.message);
			toastr.info('Internal server error in another Router');
		});
		$http.post('/api/apply', $scope.routerInfo).success(function(response) {
			console.log("Posted");
			toastr.success('Posted Successfully');
		}).error(function(res) {
			console.log(res.message);
         	toastr.error('Internal Server Error');
		});
		$scope.data.splice(i, 1);
	};
});

// TabController
ngElastic.controller('tabController', function($scope, $http, $uibModal, $log) {
	$scope.tabInit = function() {
		$http.get('/api/logs').success(function(data) {
			$scope.routes = data.hits.hits;
		}).error(function(err) {
			console.log("Error loading data");
		});
	};
	$scope.showModal = function(d) {
		if(d == "")
			$scope.remarks = "No Remarks"
		else
			$scope.remarks = d;
		var modalInstance = $uibModal.open({
			templateUrl: 'myModalContent.html',
			controller: 'ModalInstanceCtrl',
			size: 'sm',
			resolve: {
		        remarks: function(){
		          	return $scope.remarks
		        }
	      	}
		});
	}
});

// For Modal
ngElastic.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, remarks) {

  $scope.remarks = remarks;

  $scope.ok = function () {
    $uibModalInstance.close($scope.remarks);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

ngElastic.controller('notFound', function($scope) {
	$scope.title = "Not FOUND";
});