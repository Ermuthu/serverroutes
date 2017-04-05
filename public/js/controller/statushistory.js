ngElastic.controller('statusHistoryController', function($scope, $http,$routeParams) {
	// Router Name
	$scope.SHistory = "Status History"

	// Load initially when the link page called.
  $scope.StatusHistory = function() {
    $http.get('/api/statushistory/'+$routeParams.lspname).success(function(d) {
      $scope.data = d.hits.hits;
			// console.log("$scope.data",$scope.data);
    }).error(function(e) {
      console.log(e);
    });
  }

  // $scope.primary = function(pcm, pc) {
  //    // console.log(pcm,pc)
  //   if(pcm != undefined && pc != undefined){
  //     var arr = [];
  //     var result = pcm.map(function(val, index){
  //       if(typeof pc === 'string')
  //         arr.push(val+'('+pc+')');
  //       if(typeof pc === 'object')
  //         arr.push(val+'('+pc[index]+')');
  //     });
  //     var b = _.toString(arr);
  //     var c = _.replace(b, /,/g , " ");
  //     return _.split(c);
  //   }
  // };

  $scope.primary = function(pcm, pc,pi) {
    console.log(pi);
    if(pcm != undefined && pc != undefined && pi != undefined){
      var arr = [];
      var result = pcm.map(function(val, index){
        if(typeof pc === 'string')
          arr.push(val+'('+pc+')');
        if(typeof pc === 'object')
          arr.push(val + ':' + pc[index] + ' (' + pi[index] + ')');
        // arr.push(val+'('+pc[index]+')');
      });
      var b = _.toString(arr);
      var c = _.replace(b, /,/g , " ");
      return _.split(c);    
    }
  };

});

