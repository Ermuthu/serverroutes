ngElastic.controller('linkRouteController', function($scope, $http, $routeParams) {
	// Router Name
	$scope.linkRoute = "Status Route";
	$scope.isCollapsed = true;

	// Load initially when the link page called.
	$scope.isLoading = true;

	$scope.initLinkRoute = function() {

		/* ------------------------ */
		// $http.get('/proxy/link_info/stats/_search/?size=10000&pretty=1&sort=latest_speed:desc&query:matchAll').success(function(d) {
		$http.get('/api/link').success(function(d) {
			var collOfData = d.hits.hits,
				routeParam = $routeParams.dst_interface;
			_.map(collOfData, function(d) {
				var srcAndInterface = d._source.src_rtr+''+d._source.interface_name;
				if(routeParam == srcAndInterface){
					$scope.src_device = d._source.src_rtr;
					$scope.interface = d._source.interface_name;
					$scope.dst_device = d._source.dst_router;
				}
				if(routeParam == d._id){
					$scope.src_device = d._source.src_rtr;
					$scope.interface = d._source.interface_name;
					$scope.dst_device = d._source.dst_router;
				}
			})
		});

		/* ------------------------ */
		/* Starts */
		$http.get('/api/status/'+$routeParams.dst_interface.replace(/-/g, '_')).success(function(d) {
			$scope.status = d.hits.hits;
			$scope.status.map(function(d){
        $scope.isLoading = true;
				//variable declaration
				var now = new Date(),
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
				if(d._source.applied_timestamp != undefined)
					return $scope.config_applied_time = new Date(d._source.applied_timestamp);
      });
  	}).error(function(e) {
   		console.log(e);
   	});
	};

	// Primary Config
	// Format usuqo4-bbisp-gw1  lo0 (unknown)
	$scope.primaryConfigRoute = function(pcn, pc, pi) {
    if(pcn != undefined && pc != undefined && pi != undefined){
      var arr = [];
      var result = pcn.map(function(val, index){
        if(typeof pc === 'string')
          arr.push(val+'('+pc+')');
        if(typeof pc === 'object')
          arr.push(val + ' ' + pi[index] + ' (' + pc[index] + ')');
          // arr.push(val+'('+pc[index]+')');
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