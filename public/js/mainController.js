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

	// remove selected routes
	$scope.removeSelected = function() {
		var newDataList = [];
		angular.forEach($scope.data, function(d) {
			if(!d.isDelete) {
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

// notFound Controller
ngElastic.controller('notFound', function($scope) {
	$scope.title = "Not FOUND";
});