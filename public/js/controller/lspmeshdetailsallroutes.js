ngElastic.controller('lspMeshDetailsAllRoutesController', function($scope, $http, $timeout, $interval, cfpLoadingBar) {
  // Title
  $scope.table = "LSP Mesh Detail";
  $scope.showCompleteModel = false;
  $scope.showCompleteText = "Show Complete";
  $scope.statusColorMapModel = false;
  $scope.stateView = "State View";
  $scope.reset = "Active Route";
  $scope.normalView = "Active Route";
  // $scope.statusViewDD = ['Primary','Secondary','Tertiary'];
  $scope.statusViewDD = [{ "value": "pri_cnt", "text": "Primary" }, { "value": "sec_cnt", "text": "Secondary" }, { "value": "ter_cnt", "text": "Tertiary" }];
  $scope.statusSourceDD = [{ "value": "region_r1", "text": "AMR" }, { "value": "region_r2", "text": "EMEIA" }, { "value": "region_r3", "text": "APAC" }];
  $scope.statusView = null;
  $scope.statusColorMap = "Status Color Map";
  $scope.bit_map = 'value._source.bit_map';
  $scope.showLoader = false;
  $scope.allRowsLoaded = false;
  $scope.disableButton=false;
  $scope.loadAll;

  // Load initially when the table page called.
  $scope.initTable = function() {
    $scope.disableButton = false;
    // var loadAll;
    // $http.get('/proxy/lsp_grid_complete/heading/_search?size=10000&pretty&query:matchAll').success(function(d) {
    $http.get('/api/lspmeshcompleteheading').success(function(d) {
      $scope.header(d);
    });
    // $http.get('/proxy/lsp_grid_complete/stats/_search?size=10000&pretty&query:matchAll&sort=sort_rtr:asc&_source=bit_map').success(function(d) {
    $http.get('/api/lspmeshcomplete/source/bit_map').success(function(d) {
      $scope.loadOneItemPerSec(d);
    });
  };

  // load header
  $scope.header = function(d) {
    $scope.dataHeader = d.hits.hits;
    _.map(d.hits.hits, function(d) {
      $scope.headerLength = d._source.dst_routers.length/2;
      var replaceSymbol = [];
      _.map(d._source.dst_routers, function(d) {
        replaceSymbol.push(d.replace(/_/g, '-'));
      });
      $scope.tableHeader = replaceSymbol;
    });
  }

  // load one row/sec
  $scope.loadOneItemPerSec = function(d) {
    // var $scope.loadAll;
    if($scope.loadAll !== undefined) {
      $timeout.cancel($scope.loadAll);
    }
    for (var i = 1; i < d.hits.hits.length; i++) {
    // for (var i = 1; i < 6; i++) {
      $scope.loadAll = (function(y){
        $timeout(function() {
          if(y!=0){
            var nexttendata = d.hits.hits.slice(y-1,y);
            $scope.tableStats = _.concat($scope.tableStats,nexttendata);
          }
          if(y == d.hits.hits.length-1) {
          // if(y == 5) {
            $scope.disableButton = true;
          }
        }, i *300);
      })(i);
    }
  }

  // Get the values of table status
  $scope.getTableStats = function(ts) {
    $scope.isLoading = true;
    return ts;
    $scope.isLoading = false;
  };

  // For TableStatsForStatusColorMap
  $scope.getTableStatsForStatusColorMap = function(bm,scm) {
    var colorCode = [];
    _.map(scm, function(d) {
      colorCode.push(d);
    });
    $scope.colors = colorCode;
    return bm;
  }

});