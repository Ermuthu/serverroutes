ngElastic.controller('lspMeshDetailsController', function($scope, $http, $timeout, $window, $location) {
  // Title
  $scope.label = "LSP Mesh Detail - Active Router";
  $scope.allroutes = "All Routers";
  $scope.stateview = "State View";
  $scope.reset = "Active Routers";
  $scope.statusViewDD = [{ "value": "pri_cnt", "text": "Primary" }, { "value": "sec_cnt", "text": "Secondary" }, { "value": "ter_cnt", "text": "Tertiary" }];
  $scope.statusSourceDD = [{ "value": "source", "text": "Source" }, { "value": "region_r1", "text": "AMR" }, { "value": "region_r2", "text": "EMEIA" }, { "value": "region_r3", "text": "APAC" }];
  $scope.destStatus = [{ "value": "amr", "text": "AMR" }, { "value": "emeia", "text": "EMEIA" }, { "value": "apac", "text": "APAC" }];
  $scope.loadAll;
  $scope.ar = 'false';
  $scope.flag = $location.path().split('/')[2] != undefined ? $location.path().split('/')[2] : false;

  $scope.cntSrc = "source";

  // Load initially when the table page called.
  $scope.initTable = function() {
    // $http.get('/proxy/lsp_grid/heading/_search?size=10000&pretty&query:matchAll').success(function(d) {
    $http.get('/api/lspmeshheading').success(function(d) {
      $scope.header(d);
    });
    // $http.get('/proxy/lsp_grid/stats/_search?size=10000&sort=sort_rtr:asc&_source=bit_map').success(function(d) {
    $http.get('/api/lspmesh/source/bit_map').success(function(d) {
      $scope.loadOneItemPerSec(d);
    });
  };

  // All Routers Dropdown
  $scope.arDropdown = function(ar) {
    $window.location.href = '#/allroutes/' + ar;
  }

  // StateView Dropdown
  $scope.svDropdown = function(sv) {
    $window.location.href = '#/stateview/' + sv;
  }

  // Primary, Secondary and Teritary Dropdown
  $scope.pstDropdown = function(cnt) {
    var cnt;
    if(cnt == null)
      cnt = "bit_map";
    $window.location.href = '#/dropdown/' + cnt + '/' + $scope.flag;
  }

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
    if($scope.loadAll !== undefined) {
      $timeout.cancel($scope.loadAll);
    }
    // for (var i = 1; i < d.hits.hits.length+1; i++) {
    for (var i = 1; i < 6; i++) {
      $scope.loadAll = (function(y){
        $timeout(function() {
          if(y!=0){
            var nexttendata = d.hits.hits.slice(y-1,y);
            $scope.tableStats = _.concat($scope.tableStats,nexttendata);
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

});