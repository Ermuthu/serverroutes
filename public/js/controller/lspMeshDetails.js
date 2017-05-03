ngElastic.controller('lspMeshDetailsController', function($scope, $http) {
  // Title
  $scope.table = "LSP Mesh Detail";
  $scope.showCompleteModel = false;
  $scope.showComplete = "Show Complete";
  $scope.statusColorMapModel = false;
  $scope.statusColorMap = "Status Color Map";
  $scope.reset = "Reset";
  $scope.bit_map = 'value._source.bit_map';
  $scope.statusViewDD = ['Primary','Secondary','Tertiary'];
  $scope.statusView = null;
  $scope.showLoader = false;

  // Load initially when the table page called.
  $scope.initTable = function() {
    $http.get('/api/lspmeshdetailheading').success(function(d) {
      $scope.dataHeader = d.hits.hits;
      _.map(d.hits.hits, function(d) {
        $scope.headerLength = d._source.dst_routers.length/2;
        var replaceSymbol = [];
        _.map(d._source.dst_routers, function(d) {
          replaceSymbol.push(d.replace(/_/g, '-'));
        });
        $scope.tableHeader = replaceSymbol;
       });
    });
    $http.get('/api/lspmeshdetailstats').success(function(d) {
      $scope.tableStats = d.hits.hits;
      $scope.tableStatsCopy = d.hits.hits;
    });
  };

  // Get the values of table status
  $scope.getTableStats = function(ts) {
    $scope.isLoading = true;
    return ts;
    $scope.isLoading = false;
  };

  // updated the value on Show Complete button click
  $scope.updateTableWithShowComplete = function() {
    if($scope.showCompleteModel == true) {
      $http.get('/api/lspmeshdetailstatsold').success(function(d) {
        $scope.showLoader = true;
        // $('#mydiv').show();
        $scope.tableStats = d.hits.hits;
        $scope.showLoader = false;
        // $('#mydiv').hide();
      });
    } else {
      // $('#mydiv').show();
      $scope.tableStats = $scope.tableStatsCopy;
      // $scope.showLoader = false;
      // $('#mydiv').hide();
    }
  };

  // watchstatusView
  $scope.watchstatusView = function(s) {
    console.log(s);
  };

});

// directive
// ngElastic.directive('myElement', function () {
//   return {
//     restrict: 'E',
//     template: '<a ng-if="v>0" href="#/table/{{value._id}}/collectionName/{{tableHeader[$index]}}"><button class="btn default-style btn-success" tooltip-append-to-body="true" uib-tooltip=Source:{{value._source.src_rtr}}/Device:{{tableHeader[$index]}}>{{v}}</button></a>'
//   }
// });