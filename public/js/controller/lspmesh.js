ngElastic.controller('lspMeshController', function($scope, $http) {
	// Title
	$scope.lspMesh = "LSP Mesh";
	$scope.defaultLimit = 10;
	$scope.limit = 10;
	$scope.more = "(...More)";
	$scope.less = "(Less)";
	// Load onload
	$scope.initLspMesh = function() {
		// $http.get('/proxy/lsp_sum/stats/_search?size=1000&pretty=true&query=matchAll').success(function(d) {
		$http.get('/api/lspmesh').success(function(lsps) {
			$scope.lsps = lsps.hits.hits;
		}).error(function(err) {
			console.log(err);
		})
	};

	// Missing Routers
	$scope.limitMissRoute = function(route) {
		return route;
	};
});