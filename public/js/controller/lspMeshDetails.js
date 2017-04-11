ngElastic.controller('lspMeshDetailsController', function($scope, $http) {
  // Title
  $scope.table = "LSP Mesh Detail"

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
    });
  };

  // Get the values of table status
  $scope.getTableStats = function(ts) {
    $scope.isLoading = true;
    return ts;
    $scope.isLoading = false;
  };

});