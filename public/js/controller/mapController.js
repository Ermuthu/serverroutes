ngElastic.controller('mapController', function($scope, $http, $routeParams) {

	$scope.initMapController = function() {
		$scope.map = "Connected Chart";
	};

	if($routeParams.sourcenames != undefined){
		var rp = $routeParams.sourcenames,
			Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}},
	  	decode = Base64.decode(rp);
  	// console.log(rp);
	  var arrayFromParams =  _.split(decode, ',');
	  // console.log(arrayFromParams);
	  var toStr = _.toString(arrayFromParams);
	  // console.log(toStr);
	  var removeUnderscore = _.replace(toStr, /[_-]/g, ",");
	  $scope.node_coor= _.split(removeUnderscore, ',');
	  console.log($scope.node_coor);
	 }

	// Re-arrange the params to array of object for src and dest
	var five = 5;
	var connLineData = [];
	if($routeParams.sourcenames != undefined){
		for(var i=0; i<$scope.node_coor.length-3; i += 2) {
			connLineData.push({
				src_x: parseInt($scope.node_coor[i]) + five,
				src_y: parseInt($scope.node_coor[i+1]) + five,
				dest_x: parseInt($scope.node_coor[i+2]) + five,
				dest_y: parseInt($scope.node_coor[i+3]) + five
			});
		}
	}
	$scope.highlightNode = connLineData;
	console.log("highlightNode : ",$scope.highlightNode);
	// console.log($scope.highlightNode);

	// http://localhost:9090/#/lspmap/ODgwXzk1MCw4ODBfODc1LDE0MzBfNzIwLDE2MjBfOTUw
	// ["880_950", "880_875", "1430_720", "1620_950"]
	// ["uschi5-bb-cr2:lo0", "uschi5-bb-cr2:ae1004"]

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
		// console.log($scope.linkHits.length);
	}).error(function(e) {
		console.log(e);
	});
	
	// Link Highlighter
	// $scope.highlightNode = function(src, dest) {
	// 	if($routeParams.sourcenames != undefined){
	// 		if(_.findIndex(newDummyArr, function(res) {
	// 			return res.src == src && res.dest == dest;
	// 			}) > -1) {
	// 			return true;
	// 		}
	// 		else
	// 			return false;
	// 	} else {
	// 		return false;
	// 	}
	// };

	// stroke color based on bw_used value
	$scope.strokeColor = function (bw) {
		// console.log(bw);
 		if(bw>0 && bw<11)
 			return '#4D72E3';
 		else if(bw>10 && bw<21)
 			return '#48CCCD';
 		else if(bw>20 && bw<31)
 			return '#00FF00';
 		else if(bw>30 && bw<41)
 			return '#B1FB17';
 		else if(bw>40 && bw<51)
 			return '#FFFF00';
 		else if(bw>50 && bw<61)
 			return '#FDD017';
 		else if(bw>60 && bw<71)
 			return '#FBB117';
 		else if(bw>70 && bw<81)
 			return '#F87217';
 		else if(bw>80 && bw<91)
 			return '#FF0000';
 		else if(bw>90 && bw<101)
 			return '#F6358A”';
 		// else if(bw == '-')
 		// 	return 'red';
 		// else if(bw==-0)
 		// 	return 'yellow';
 		else
			return '#4D72E3';
 	};
 	// $scope.convertValues = function(w) {
 	// 	var width = angular.element(document.querySelectorAll(".global-clr-nde-lnk")[w]).clientWidth;
 	// 	console.log("WIDTH : ", width);
 	// 	return width/2;
 	// }
 	$scope.strokeColor2 = function (bw) {
		// console.log(bw);
 		if(bw>0 && bw<11)
 			return '#4D72E3';
 		else if(bw>10 && bw<21)
 			return '#48CCCD';
 		else if(bw>20 && bw<31)
 			return '#00FF00';
 		else if(bw>30 && bw<41)
 			return '#B1FB17';
 		else if(bw>40 && bw<51)
 			return '#FFFF00';
 		else if(bw>50 && bw<61)
 			return '#FDD017';
 		else if(bw>60 && bw<71)
 			return '#FBB117';
 		else if(bw>70 && bw<81)
 			return '#F87217';
 		else if(bw>80 && bw<91)
 			return '#FF0000';
 		else if(bw>90 && bw<101)
 			return '#F6358A”';
 		// else if(bw == '-')
 		// 	return 'red';
 		// else if(bw==-0)
 		// 	return 'yellow';
 		else
			return '#4D72E3';
 	};
	// 
	$scope.limitMissRoute = function(val) {
		return replaceSymbol(val.replace(/_/g, '-'));
	};

	// $scope.hoverIn = function(sx,sy,dx,dy) {
	// 	console.log(sx,sy,dx,dy);
	// }

});