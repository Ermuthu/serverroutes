ngElastic.controller('mapController', function($scope, $http) {

	$scope.initMapController = function() {
		$scope.map = "Connected Chart";
	};

	// Nodes
	// $http.get('/proxy/map_info/config/_search?size=10000&pretty%27%20-d%20%27{%22query%22%20:%20{%22matchAll%22%20:%20{}}}%27').success(function(n) {
	$http.get('/api/mapnodes').success(function(n) {
		$scope.nodeHits = n.hits.hits;
	}).error(function(e) {
		console.log(e);
	});

	// Links
	// $http.get('/proxy/map_link_info/config/_search?size=10000&pretty%27%20-d%20%27{%22query%22%20:%20{%22matchAll%22%20:%20{}}}%27').success(function(l){
	$http.get('/api/maplinks').success(function(l) {
		$scope.linkHits = l.hits.hits;
	}).error(function(e) {
		console.log(e);
	});

});