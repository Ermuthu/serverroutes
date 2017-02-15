ngElastic.controller('lspMeshController', function($scope, $http) {
	// Title
	$scope.lspMesh = "LSP Mesh";

	// Load onload
	$scope.initLspMesh = function() {
		$http.get('/api/lspmesh').success(function(lsps) {
			$scope.lsps = lsps.hits.hits;
		}).error(function(err) {
			console.log(err);
		})
	};

});