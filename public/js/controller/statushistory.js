ngElastic.controller('statusHistoryController', function($scope, $http,$routeParams) {
	// Router Name
	$scope.SHistory = "Status History"

	// Load initially when the link page called.
  $scope.StatusHistory = function() {
    $http.get('/api/statushistory/'+$routeParams.lspname).success(function(d) {
      $scope.data = d.hits.hits;
    }).error(function(e) {
      console.log(e);
    });
  }

  // Radio button default actions
  $scope.singleModel = false;
  $scope.showlo = "show lo0";
  $scope.disablelo = "disable lo0";

  // watch show/disable lo radio button
  $scope.$watch('singleModel', function() {
  });
  
  // Merge all the input array and give as single array
  $scope.primary = function(pcm, pc, pi) {
    if(pcm != undefined && pc != undefined){
      var arr = [];
      var hidelo = [];
      pcm.map(function(val, index){
        if(typeof pc === 'string')
          arr.push(val+'('+pc+')');
        if(typeof pc === 'object') {
          if(pi != undefined)
            arr.push(val + ':' + pc[index] + ' (' + pi[index] + ')');
          else
            arr.push(val + ':' + pc[index]);
        }
      });
      var removeLoFromArr = [];
      _.map(arr, function(findlo) {
        if(findlo.indexOf(":lo0") == -1)
          removeLoFromArr.push(findlo);
      });
      var arrToString = _.toString(arr);
      var mergeAllArr = _.replace(arrToString, /,/g , " ");
      var removeLoToString = _.toString(removeLoFromArr);
      var mergeAllArrLo = _.replace(removeLoToString, /,/g , " ");
      if($scope.singleModel == true)
        return _.split(mergeAllArr);
      else
        return _.split(mergeAllArrLo);
    }
  };

});

