ngElastic.controller('mapController', function($scope, $http, $routeParams, $window) {

	$scope.initMapController = function() {
		$scope.map = "Connected Chart";
	};
	$scope.draw = SVG('drawing').size(3650, 1060);
	// $scope.sampleCode = "#48f635";

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
	// $http.get('/api/mapnodes').success(function(n) {
	// 	$scope.nodeHits = n.hits.hits;
	// 	_.map($scope.nodeHits, function(d) {
	// 		$scope.draw.rect(100,20).fill('#e74c3c').move(d._source.x - 6,d._source.y - 13).stroke('#c0392b').attr('class','svg-rect-box')
	// 		$scope.draw.text(d._id).move(d._source.x,d._source.y-5).font({ fill: '#fff', size: 11 }).attr('class','svg-rect-text')
	// 	});
	// }).error(function(e) {
	// 	console.log(e);
	// });

	// Links
	// $http.get('/proxy/map_link_info/config/_search?size=10000&pretty%27%20-d%20%27{%22query%22%20:%20{%22matchAll%22%20:%20{}}}%27').success(function(l){
	$http.get('/api/maplinks').success(function(l) {
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
			} else if(d._source.src_x === d._source.dst_x) {
				var src_x = parseInt(d._source.src_x)+1;
				path = $scope.draw.path('M'+src_x+' '+d._source.src_y+' L'+d._source.dst_x+' '+d._source.dst_y)
			} else {
				path = $scope.draw.path('M'+d._source.src_x+' '+d._source.src_y+' L'+d._source.dst_x+' '+d._source.dst_y)
			}
			path.stroke(linear)
			path.stroke({ width: 2, linecap: 'round', linejoin: 'round'})
		});
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
				.front()
				// anchor tag
				.click(function() {
					$window.location.href = '#/status/'+d._id;
				});
			// text inside rectangle
			$scope.draw.text(d._id)
				.move(d._source.x,d._source.y-5)
				.font({ fill: '#fff', size: 11 })
				.attr('class','cursor-pointer')
				.front()
				.click(function() {
					$window.location.href = '#/status/'+d._id;
				});
		});
	}).error(function(e) {
		console.log(e);
	});

	// $http.get('/api/mapnodes').success(function(n) {
	// 	$scope.nodeHits = n.hits.hits;
	// 	_.map($scope.nodeHits, function(d) {
	// 		$scope.draw.rect(100,20).fill('#c0392b').move(d._source.x - 6,d._source.y - 13).fill('#e74c3c').attr('class','svg-rect-box')
	// 		$scope.draw.text(d._id).move(d._source.x - 6,d._source.y - 13).font({ fill: '#fff', size: 11 })
	// 	});
	// }).error(function(e) {
	// 	console.log(e);
	// });
	
	// var draw = SVG('drawing').size(3650, 1060)
	// var linear = draw.gradient('linear', function(stop) {
	//   stop.at(0, '#f06')
	//   stop.at(1, '#000')
	// });
	// var path;
		// path = draw.path('M'+d._source.src_x d._source.src_y+' L'+d._source.dst_x d._source.dst_y);
	// _.map($scope.linkHits, function(d) {
	// 	console.log(d);
	// });
	// path = draw.path('M0 0 L50 20')
	// path.fill('none').move(20, 20)
	// //path.stroke({ width: 4, linecap: 'round', linejoin: 'round'})
	// path.stroke(linear)
	// path.center(50,50)
	// path.stroke({width: 5})


	
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

 	// coords
 	$scope.coords = function(x1,x2,y1,y2) {
 		console.log("hEllo");
		if(x2 === y2) {
			var x2new = parseInt(x2)+1;
			return 'M'+x1+' '+x2new+' L'+y1+' '+y2;
		} else if(x1 === y1) {
			var x1new = parseInt(x1)+1;
			return 'M'+x1new+' '+x2+' L'+y1+' '+y2
		} else {
			return 'M'+x1+' '+x2+' L'+y1+' '+y2
		}
 	}

 	// get the center 1500/430/1500/100 965 800 165
 	$scope.lineCenter = function(x1,x2,y1,y2) {
 		console.log()
 		// console.log(x1,x2,y1,y2);
 		var x;
 		var y;
 		if(x1>y1) {
 			x = (parseInt(x1)-parseInt(x2))/2;
 			y = (parseInt(y1)-parseInt(y2))/2;
 			return x-y
 		} else {
 			x = (parseInt(x1)+parseInt(x2))/2;
 			y = (parseInt(y1)+parseInt(y2))/2;
	 		return y-x;
	 	}
 	};

 // 	var x = (parseInt(x1)+parseInt(x2))/2;
	// var y = (parseInt(y1)+parseInt(y2))/2;
	// return y-x;
 	// var svg   = document.querySelector("svg");
  // var svgns = "http://www.w3.org/2000/svg";
  // var el = element[0].querySelector("path");
  // var bbox = el.getBoundingClientRect();
  // console.log("bbox",bbox);

	// 
	$scope.limitMissRoute = function(val) {
		return replaceSymbol(val.replace(/_/g, '-'));
	};

	// $scope.hoverIn = function(sx,sy,dx,dy) {
	// 	console.log(sx,sy,dx,dy);
	// }

});