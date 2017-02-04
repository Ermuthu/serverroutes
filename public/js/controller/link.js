ngElastic.controller('linkController', function($scope, $http) {
	$scope.initLink = function() {
		$http.get('/api/link').success(function(d) {
			$scope.data = d.hits.hits;
			console.log($scope.data);
		});
	};
});