ngElastic.controller('linkController', function($scope, $http) {
	// Router Name
	$scope.link = "Link"

	// Load initially when the link page called.
	$scope.initLink = function() {
		$http.get('/api/link').success(function(d) {
			$scope.dataset = d.hits.hits;
		});
	};

	// Get the b_w values in new line each
	$scope.getDescValue = function(v) {
		var descriptionValue = _.filter(v, function(d) {
			return d.indexOf("#") !== 0;
		});
		return descriptionValue.join('\n');
	}

	// Get the color code to set as bg color for td.
	// Set the array[0] as bg color.
	$scope.getBGColor = function(v) {
		var descriptionBGColor = _.filter(v, function(d) {
			return d.indexOf("#") == 0;
		});
		return descriptionBGColor;
	}
});