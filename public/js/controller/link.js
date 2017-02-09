ngElastic.controller('linkController', function($scope, $http) {
	// Router Name
	$scope.link = "Link"

	// Load initially when the link page called.
	$scope.initLink = function() {
		$http.get('/api/link').success(function(d) {
			$scope.dataset = d.hits.hits;
			_.map(d.hits.hits, function(d) {
				$scope.valueLength = d._source.b_w.length/2;
				$scope.heading = d._source.heading;
			});
		});
	};

	// Get the b_w values in new line each
	$scope.getDescValue = function(v) {
		$scope.isLoading = true;
		var values = [],colorCode = [];
		var descriptionValue = _.filter(v, function(d) {
				if(d.indexOf("#") !== 0)
					values.push(d);
				else if((d.indexOf("#") == 0))
					colorCode.push(d);
				else
					console.log(d);
		});
		$scope.colors = colorCode;
		return values;
		$scope.isLoading = false;
	}
});