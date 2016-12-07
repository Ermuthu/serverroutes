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
		$http.get('/api/ip').success(function(ids) {
			$scope.routes = ids.hits.hits;
		}).error(function(err) {
			console.log(err.message);
		});
	};
});

ngElastic.controller('ipController', function($scope, $http, $routeParams) {
	$http.get('/api/ip/'+ $routeParams.id).success(function(data) {
		$scope.data = data;
		for (var i in data.existing_config){
	    	$scope.router_name = i;
		}
	}).error(function(err) {
		console.log(err.message);
	});
});

ngElastic.controller('notFound', function($scope) {
	$scope.title = "Not FOUND";
});