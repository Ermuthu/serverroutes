ngElastic.controller('mapController', function($scope, $http, $routeParams, $window, $timeout, $q) {

	$scope.initMapController = function() {
		$scope.map = "Connected Chart";
		$scope.isLoading = false;
	};
	$scope.draw = SVG('drawing').size(3650, 1060);

	if($routeParams.sourcenames != undefined){
		var rp = $routeParams.sourcenames,
			Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}},
	  	decode = Base64.decode(rp);
	  var arrayFromParams =  _.split(decode, ',');
	  var toStr = _.toString(arrayFromParams);
	  var removeUnderscore = _.replace(toStr, /[_-]/g, ",");
	  $scope.node_coor= _.split(removeUnderscore, ',');
 	}

	$http.get('/api/maplinks').success(function(l) {
		$scope.isLoading = true;
		$scope.linkHits = l.hits.hits;
		var path;
		_.map($scope.linkHits, function(d) {
			var linear = $scope.draw.gradient('linear', function(stop) {
			  stop.at({offset: '50%', color: $scope.strokeColor(d._source.in_bw_used)})
			  stop.at({offset: '50%', color: $scope.strokeColor(d._source.out_bw_used)})
			});
			/*
			* 1. if src_y and dst_y are same, add 1 to src_y
			* 2. else if src_x and dst_x are same, add 1 to src_x
			* 3. else src_y and dst_y (default)
			*/
			if(d._source.src_y === d._source.dst_y) {
				var src_y = parseInt(d._source.src_y)+1;
				path = $scope.draw.path('M'+d._source.src_x+' '+src_y+' L'+d._source.dst_x+' '+d._source.dst_y)
					.click(function() {
						$window.location.href = '#/status/'+d._source.source+''+d._source.bundle_intf;
					})
					.attr('class','cursor-pointer')
			} else if(d._source.src_x === d._source.dst_x) {
				var src_x = parseInt(d._source.src_x)+1;
				path = $scope.draw.path('M'+src_x+' '+d._source.src_y+' L'+d._source.dst_x+' '+d._source.dst_y)
					.click(function() {
						$window.location.href = '#/status/'+d._source.source+''+d._source.bundle_intf;
					})
					.attr('class','cursor-pointer')
			} else {
				path = $scope.draw.path('M'+d._source.src_x+' '+d._source.src_y+' L'+d._source.dst_x+' '+d._source.dst_y)
					.click(function() {
						$window.location.href = '#/status/'+d._source.source+''+d._source.bundle_intf;
					})
					.attr('class','cursor-pointer')
			}
			path.stroke(linear)
			path.stroke({ width: 3, linecap: 'round', linejoin: 'round'})
			path.back();
		});
		$scope.isLoading = false;
	}).error(function(e) {
		console.log(e);
	});
	
	$http.get('/api/mapnodes').success(function(n) {
		$scope.nodeHits = n.hits.hits;
		_.map($scope.nodeHits, function(d) {
			// draw rectangle
			$scope.draw.rect(100,20)
				.fill('#e74c3c')
				.move(d._source.x - 6,d._source.y - 13)
				.stroke('#c0392b')
				.attr('class','cursor-pointer')
				// anchor tag
				.click(function() {
					$window.location.href = '#/status/'+d._id;
				})
			// text inside rectangle
			$scope.draw.text(d._id)
				.move(d._source.x,d._source.y-5)
				.font({ fill: '#fff', size: 11 })
				.attr('class','cursor-pointer')
				.click(function() {
					$window.location.href = '#/status/'+d._id;
				});
		});
	}).error(function(e) {
		console.log(e);
	});

	// stroke color based on bw_used value
	$scope.strokeColor = function (bw) {
 		if(bw>0 && bw<11)
 			return "#4D72E3";
 		else if(bw>10 && bw<21)
 			return "#48CCCD";
 		else if(bw>20 && bw<31)
 			return "#00FF00";
 		else if(bw>30 && bw<41)
 			return "#B1FB17";
 		else if(bw>40 && bw<51)
 			return "#FFFF00";
 		else if(bw>50 && bw<61)
 			return "#FDD017";
 		else if(bw>60 && bw<71)
 			return "#FBB117";
 		else if(bw>70 && bw<81)
 			return "#F87217";
 		else if(bw>80 && bw<91)
 			return "#FF0000";
 		else if(bw>90 && bw<101)
 			return "#F6358A";
 		else
			return '#4D72E3';
 	};

});