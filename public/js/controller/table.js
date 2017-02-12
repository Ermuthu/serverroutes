ngElastic.controller('tableController', function($scope, $http) {
	// Title
	$scope.table = "Table"

	// Load initially when the table page called.
	$scope.initTable = function() {
		// $http.get('/proxy/lsp_grid/heading/_search??size=10000&pretty&query:matchAl').success(function(d) {
		$http.get('/api/tableheading').success(function(d) {
			$scope.dataHeader = d.hits.hits;
			_.map(d.hits.hits, function(d) {
				$scope.headerLength = d._source.dst_routers.length/2;
				$scope.tableHeader = d._source.dst_routers;
			});
		});
		// $http.get('/proxy/lsp_grid/stats/_search?size=10000&pretty&query:matchAll').success(function(d) {
		$http.get('/api/tablestats').success(function(d) {
			$scope.tableStats = d.hits.hits;
		});
	};

	// Get the values of table status
	$scope.getTableStats = function(ts) {
		$scope.isLoading = true;
		return ts;
		$scope.isLoading = false;
	};
});