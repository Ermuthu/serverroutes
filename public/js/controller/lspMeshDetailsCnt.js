ngElastic.controller('lspMeshDetailsCntController', function($scope, $http, $timeout, $routeParams, $window) {
  // Title
  // $scope.table = "LSP Mesh Detail";
  $scope.allroutes = "All Routers";
  $scope.stateview = "State View";
  $scope.reset = "Active Routers";
  $scope.statusViewDD = [{ "value": "pri_cnt", "text": "Primary" }, { "value": "sec_cnt", "text": "Secondary" }, { "value": "ter_cnt", "text": "Tertiary" }];
  $scope.statusSourceDD = [{ "value": "region_r1", "text": "AMR" }, { "value": "region_r2", "text": "EMEIA" }, { "value": "region_r3", "text": "APAC" }];
  $scope.destStatus = [{ "value": "amr", "text": "AMR" }, { "value": "emeia", "text": "EMEIA" }, { "value": "apac", "text": "APAC" }];
  $scope.loadAll;
  $scope.cnt = $routeParams.cnt;
  // console.log($scope.cnt);
  $scope.flag = $routeParams.svflag == undefined ? false : $routeParams.svflag;

  // Load initially when the table page called.
  $scope.initTable = function() {
    // console.log($scope.flag);
    if($scope.flag == "true") {
      // $http.get('/proxy/lsp_grid_complete/heading/_search?size=10000&pretty&query:matchAll').success(function(d) {
      $http.get('/api/lspmeshcompleteheading').success(function(d) {
        $scope.header(d);
      });
      if($scope.cnt == 'pri_cnt' || $scope.cnt == 'sec_cnt' || $scope.cnt == 'ter_cnt') {
        $scope.label = "LSP Mesh Detail - " + $scope.cnt + " - Complete";
        // $http.get('/proxy/lsp_grid_complete/stats/_search?size=10000&pretty&query:matchAll&sort=sort_rtr:asc&_source=pri_cnt').success(function(d) {
        $http.get('/api/lspmeshcomplete/source/'+$scope.cnt).success(function(d) {
          $scope.loadOneItemPerSec(d);
        });
      } else if($scope.cnt == 'amr' || $scope.cnt == 'emeia' || $scope.cnt == 'apac') {
        // $http.get('/proxy/lsp_grid_complete/stats/_search?size=10000&pretty&query:matchAll&sort=sort_rtr:asc&_source=pri_cnt').success(function(d) {
        $http.get('/api/lspmeshcomplete/source/bit_map').success(function(d) {
          var amr = [], emeia = [], apac = [];
          _.map(d.hits.hits, function(d) {
            if(d._id.substring(0,2) == 'us')
              amr.push(d);
            else if(d._id.substring(0,2) == 'de' || d._id.substring(0,2) == 'gb' || d._id.substring(0,2) == 'uk')
              emeia.push(d);
            else
              apac.push(d);
          });
          if($scope.cnt == 'amr') {
            $scope.label = "LSP Mesh Detail - " + $scope.cnt + " - Complete";
            $scope.loadOneItemPerSec({hits: {hits: amr}});
          } else if($scope.cnt == 'emeia') {
            $scope.label = "LSP Mesh Detail - " + $scope.cnt + " - Complete";
            $scope.loadOneItemPerSec({hits: {hits: emeia}});
          } else {
            $scope.label = "LSP Mesh Detail - " + $scope.cnt + " - Complete";
            $scope.loadOneItemPerSec({hits: {hits: apac}});
          }
        });
      } else {
        $scope.label = "LSP Mesh Detail - " + $scope.cnt + " - Complete";
        // $http.get('/proxy/lsp_grid_complete/stats/_search?size=10000&pretty&query:matchAll&sort=sort_rtr:asc&_source=pri_cnt').success(function(d) {
        $http.get('/api/lspmeshcomplete/source/bit_map').success(function(d) {
          $scope.loadOneItemPerSec(d);
        });
      }
    } else {
      // $http.get('/proxy/lsp_grid_complete/heading/_search?size=10000&pretty&query:matchAll').success(function(d) {
      $http.get('/api/lspmeshheading').success(function(d) {
        $scope.header(d);
      });
      if($scope.cnt == 'pri_cnt' || $scope.cnt == 'sec_cnt' || $scope.cnt == 'ter_cnt') {
        $scope.label = "LSP Mesh Detail - " + $scope.cnt + " - Default";
        // $http.get('/proxy/lsp_grid_complete/stats/_search?size=10000&pretty&query:matchAll&sort=sort_rtr:asc&_source=pri_cnt').success(function(d) {
        $http.get('/api/lspmesh/source/'+$scope.cnt).success(function(d) {
          $scope.loadOneItemPerSec(d);
        });
      } else if($scope.cnt == 'amr' || $scope.cnt == 'emeia' || $scope.cnt == 'apac') {
        // $http.get('/proxy/lsp_grid_complete/stats/_search?size=10000&pretty&query:matchAll&sort=sort_rtr:asc&_source=pri_cnt').success(function(d) {
        $http.get('/api/lspmesh/source/bit_map').success(function(d) {
          var amr = [], emeia = [], apac = [];
          _.map(d.hits.hits, function(d) {
            if(d._id.substring(0,2) == 'us')
              amr.push(d);
            else if(d._id.substring(0,2) == 'de' || d._id.substring(0,2) == 'gb' || d._id.substring(0,2) == 'uk')
              emeia.push(d);
            else
              apac.push(d);
          });
          if($scope.cnt == 'amr') {
            $scope.label = "LSP Mesh Detail - " + $scope.cnt + " - Default";
            $scope.loadOneItemPerSec({hits: {hits: amr}});
          } else if($scope.cnt == 'emeia') {
            $scope.label = "LSP Mesh Detail - " + $scope.cnt + " - Default";
            $scope.loadOneItemPerSec({hits: {hits: emeia}});
          } else {
            $scope.label = "LSP Mesh Detail - " + $scope.cnt + " - Default";
            $scope.loadOneItemPerSec({hits: {hits: apac}});
          }
        });
      } else {
        $scope.label = "LSP Mesh Detail - " + $scope.cnt + " - Default";
        // $http.get('/proxy/lsp_grid_complete/stats/_search?size=10000&pretty&query:matchAll&sort=sort_rtr:asc&_source=pri_cnt').success(function(d) {
        $http.get('/api/lspmesh/source/'+$scope.cnt).success(function(d) {
          $scope.loadOneItemPerSec(d);
        });
      }
    }
  };

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
    // for (var i = 1; i < d.hits.hits.length; i++) {
    for (var i = 1; i < 10; i++) {
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