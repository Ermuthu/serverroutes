ngElastic.controller('mapDropdownController', function($scope, $http, $routeParams, $window, $timeout, $q) {

	$scope.initMapDropdownController = function() {
  	$scope.sourceDropdown = [{ "value": "region_r1", "text": "AMR" }, { "value": "region_r2", "text": "EMEIA" }, { "value": "region_r3", "text": "APAC" }];
  	$scope.destDropdown = [{ "value": "amr", "text": "AMR" }, { "value": "emeia", "text": "EMEIA" }, { "value": "apac", "text": "APAC" }];
		$scope.map = "Connected Chart";
		$scope.isLoading = false;
		$http.get('/api/maplinkshighlight').success(function(l) {
			$scope.links(l);
		}).error(function(e) {
			console.log(e);
		});
	};
	$scope.draw = SVG('drawing2').size(3650, 1060);
	
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

 	// Dropdown's
 	$scope.dropdown = function(src, dest) {
 		if(!_.isUndefined(src) && !_.isUndefined(dest)) {
 			console.log(src,dest);
 			$scope.linkHits = [];
 			console.log("destDropdown",$scope.linkHits);
 			$http.get('/api/maplinkshighlight').success(function(d) {
 				$scope.links(d);
 			}).error(function(e) {
 				console.log(e);
 			});
 		}
  }

  // Links
  $scope.links = function(d) {
		$scope.isLoading = true;
		$scope.linkHits = d.hits.hits;
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
  }

});