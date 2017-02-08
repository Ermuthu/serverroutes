ngElastic.controller('linkController', function($scope, $http) {
	// Router Name
	$scope.link = "Link"

	// Load initially when the link page called.
	$scope.initLink = function() {
		// $scope.isLoading = true;
		$http.get('/api/link').success(function(d) {
			$scope.dataset = d.hits.hits;
			var bw = _.map(d.hits.hits, function(d) {
				$scope.valueLength = d._source.b_w.length/2;
			});
		});
		// $scope.isLoading = false;
	};

	// Get the b_w values in new line each
	$scope.getDescValue = function(v) {
		$scope.isLoading = true;
		var descriptionValue = _.filter(v, function(d) {
			return d.indexOf("#") !== 0;
		});
		return descriptionValue;
		$scope.isLoading = false;
	}

	// Get the color code to set as bg color for td.
	// Set the array[0] as bg color.
	// $scope.getBGColor = function(v) {
	// 	var descriptionBGColor = _.filter(v, function(d) {
	// 		return d.indexOf("#") == 0;
	// 	});
	// 	return descriptionBGColor;
	// }
	$scope.getRandomColor = function() {
		var hexCode = '0123456789ABCDEF'.split(''),
        colorCode = '#';
    for(var i = 0; i < 6; i++) {
        colorCode += hexCode[Math.round(Math.random() * 15)];
    }
    return {'background-color': colorCode};
	}
});