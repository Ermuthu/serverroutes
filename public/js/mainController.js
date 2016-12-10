var ngElastic = angular.module('ngElastic',['ngRoute']);

ngElastic.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	// Router
	$routeProvider.
		when('/ip/:id', {
			templateUrl: 'views/ip.html',
			controller: 'ipController'
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
		var url = 'http://10.12.21.14:9200/mpls_lsps/_search?search_type=count&pretty&source={%22aggregations%22:{%22states%22:{%22terms%22:{%22field%22:%22router_name%22},%22aggs%22:{%22hits%22:{%22top_hits%22:{%22size%22:1}}}}}}';
		$http.get(url).success(function(data) {
			var extractData =  data.aggregations.states.buckets.map(function(data) {
				$scope.total = data.doc_count;
				$scope.routes = data.hits.hits.hits;
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
	$http.get('http://10.12.21.14:9200/mpls_lsps/_search?q=_id:'+$routeParams.id+'&pretty=true').success(function(data) {
		var dataById = data.hits.hits[0];
		$scope.data = data.hits.hits[0];
		for (var i in dataById._source.existing_config){
	    	$scope.router_name = i;
	    	$scope.existing_config = dataById._source.existing_config[i];
		}
		for (var i in dataById._source.new_config){
	    	$scope.new_config = dataById._source.new_config[i];
		}

     	}).error(function(err) {
		console.log(err.message);
	});
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
	$scope.postData = function(req, res) {
        var routerInfo = {
			Router_name: $scope.data._source.router_name,
			LSP_name: $scope.data._id,
			Hops: $scope.existing_config,
			NodeSeq: $scope.new_config
		};
		$http.post('http://10.12.21.14:9095/apply', routerInfo).success(function(response) {
			console.log("Posted");
		}).error(function(res) {
         	console.log(res.message);
		});
	};
});

ngElastic.controller('notFound', function($scope) {
	$scope.title = "Not FOUND";
});