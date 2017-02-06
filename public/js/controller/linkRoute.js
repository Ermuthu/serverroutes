ngElastic.controller('linkRouteController', function($scope, $http, $routeParams) {
	// Router Name
	$scope.linkRoute = "Status Route";
	$scope.isCollapsed = true;

	// Load initially when the link page called.
	$scope.isLoading = true;
	$scope.initLinkRoute = function() {
		$http.get('/api/status/'+$routeParams.dst_interface).success(function(d) {
			$scope.status = d.hits.hits;
			$scope.status.map(function(d){
        $scope.isLoading = true;
				//variable declaration
				if(d._source.applied_timestamp != undefined)
					return $scope.config_applied_time = new Date(d._source.applied_timestamp);
				var now = new Date();
       	then  = new Date(d._source.running_timestamp*1000),
       	diff = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss")),
       	duration = moment.duration(diff),
       	ss = Math.floor(duration.asHours()) + moment.utc(diff).format(":mm:ss"),
       	hour = Math.floor(duration.asHours()),
       	min = Math.floor(duration.asMinutes()),
       	sec = Math.floor(duration.asSeconds());
				// check for higher grade
				$scope.updated_date = then;
				if(hour > 0)
					$scope.last_updated_time = hour + ' Hours ago';
				else if(min > 0)
					$scope.last_updated_time = min + ' Minutes ago';
				else if(min < 0 && sec > 0)
					$scope.last_updated_time = sec + ' Seconds ago';
				else
					$scope.last_updated_time = 'Time is up to date';
      });
  	}).error(function(e) {
   		console.log(e);
   	});
	};

	// Primary Config
	$scope.primaryConfigRoute = function(pcn, pc) {
    if(pcn != undefined && pc != undefined){
      var arr = [];
      var result = pcn.map(function(val, index){
        if(typeof pc === 'string')
          arr.push(val+'('+pc+')');
        if(typeof pc === 'object')
          arr.push(val+'('+pc[index]+')');
      });
      return arr;
    }
  };

  // Secondary config
  $scope.secondaryConfigRoute = function(pcn, pc) {
    if(pcn != undefined && pc != undefined){
      var arr = [];
      var result = pcn.map(function(val, index){
        if(typeof pc === 'string')
          arr.push(val+'('+pc+')');
        if(typeof pc === 'object')
          arr.push(val+'('+pc[index]+')');
      });
      return arr;
    }
  };

});