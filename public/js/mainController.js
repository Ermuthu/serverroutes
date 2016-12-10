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
		$http.get('/api/id').success(function(ids) {
			$scope.routes = ids.hits.hits;
		}).error(function(err) {
			console.log(err.message);
		});
	};
});

ngElastic.controller('ipController', function($scope, $http, $routeParams) {
	$http.get('/api/id/'+ $routeParams.id).success(function(data) {
		$scope.data = data;
		for (var i in data._source.existing_config){
	    	$scope.router_name = i;
	    	$scope.existing_config = data._source.existing_config[i];
		}
		for (var i in data._source.new_config){
	    	$scope.new_config = data._source.new_config[i];
		}
	}).error(function(err) {
		console.log(err.message);
	});
	$scope.postData = function(req, res) {
		var routerInfo = {
			Router_name: $scope.data._source.router_name,
			LSP_name: $scope.data._id,
			Hops: $scope.existing_config,
			NodeSeq: $scope.new_config
		};
		var Result = {config: routerInfo};
		$http.post('/api/apply', Result).success(function(response) {
			console.log("Posted");
		}).error(function(res) {
			console.log(res.message);
		});
	};
});

ngElastic.controller('notFound', function($scope) {
	$scope.title = "Not FOUND";
});