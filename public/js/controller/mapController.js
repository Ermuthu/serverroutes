ngElastic.controller('mapController', function($scope, $http, $routeParams) {

	$scope.initMapController = function() {
		$scope.map = "Connected Chart";
	};

	if($routeParams.sourcenames != undefined){
		var rp = $routeParams.sourcenames,
			Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}},
	  	decode = Base64.decode(rp);
	  $scope.sourcenames =  _.split(decode,',');
	  console.log($scope.sourcenames);
	 }

	// console.log("Routeparams : ",$routeParams.sourcenames);

	var nodes = ["jptyo7-bbisp-gw2","jptyo5-bbisp-gw2"];

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

	// Highlighter
	$scope.highlightNode = function(nod) {
		if($routeParams.sourcenames != undefined){
			if(_.indexOf($scope.sourcenames, nod) > -1)
				return true;
			else
				return false;
		} else {
			return false;
		}
	};

});