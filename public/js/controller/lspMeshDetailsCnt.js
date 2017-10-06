ngElastic.controller('lspMeshDetailsCntController', function($scope, $http, $timeout, $routeParams, $window) {
  // Title
  $scope.allroutes = "All Routers";
  $scope.stateview = "State View";
  $scope.reset = "Active Routers";
  $scope.statusViewDD = [{
    "value": "pri_cnt",
    "text": "Primary"
  }, {
    "value": "sec_cnt",
    "text": "Secondary"
  }, {
    "value": "ter_cnt",
    "text": "Tertiary"
  }];
  $scope.statusSourceDD = [{ "value": "source", "text": "Source" }, {
    "value": "region_r1",
    "text": "AMR"
  }, {
    "value": "region_r2",
    "text": "EMEIA"
  }, {
    "value": "region_r3",
    "text": "APAC"
  }];
  $scope.destStatus = [{
    "value": "amr",
    "text": "AMR"
  }, {
    "value": "emeia",
    "text": "EMEIA"
  }, {
    "value": "apac",
    "text": "APAC"
  }];
  $scope.loadAll;
  $scope.flag = $routeParams.svflag == undefined ? false : $routeParams.svflag;
  $scope.cntSrc = "source";

  if($routeParams.cnt == 'region_r1' || $routeParams.cnt == 'region_r2' || $routeParams.cnt == 'region_r3' || $routeParams.tcksrc == 'region_r1' || $routeParams.tcksrc == 'region_r2' || $routeParams.tcksrc == 'region_r3'){
    if($routeParams.tcksrc == 'region_r1' || $routeParams.tcksrc == 'region_r2' || $routeParams.tcksrc == 'region_r3') {
      $scope.cntSrc = $routeParams.tcksrc;
      $scope.cnt = $routeParams.cnt;
    } else {
      $scope.cntSrc = $routeParams.cnt;
    }
  } else {
    $scope.cnt = $routeParams.cnt;
  }

  // Load initially when the table page called.
  $scope.initTable = function() {
    if ($scope.flag == "true") {
      // $http.get('/proxy/lsp_grid_complete/heading/_search?size=10000&pretty&query:matchAll').success(function(d) {
      $http.get('/api/lspmeshcompleteheading').success(function(d) {
        $scope.header(d);
      });
      if ($scope.cnt == 'pri_cnt' || $scope.cnt == 'sec_cnt' || $scope.cnt == 'ter_cnt') {
        var key;
        if ($scope.cnt == 'pri_cnt')
          key = "";
        else if ($scope.cnt == 'sec_cnt')
          key = "Secondary";
        else if ($scope.cnt == 'ter_cnt')
          key = "Teritary";
        else
          key = ""
        $scope.label = "LSP Mesh Detail - All Routers - " + key;
        // $http.get('/proxy/lsp_grid_complete/stats/_search?size=10000&pretty&query:matchAll&sort=sort_rtr:asc&_source=pri_cnt').success(function(d) {
        $http.get('/api/lspmeshcomplete/source/' + $scope.cnt).success(function(d) {
          $scope.loadOneItemPerSec(d);
        });
      } else if ($scope.cnt == 'amr' || $scope.cnt == 'emeia' || $scope.cnt == 'apac') {
        $scope.label = "LSP Mesh Detail - All Routers - " + _.upperCase($scope.cnt);
        // $http.get('/proxy/lsp_grid_complete/stats/_search?size=10000&pretty&query:matchAll&sort=sort_rtr:asc&_source=pri_cnt').success(function(d) {
        $http.get('/api/lspmeshcomplete/source/bit_map').success(function(d) {
          var amr = [],
            emeia = [],
            apac = [];
          _.map(d.hits.hits, function(d) {
            if ($scope.cnt == 'amr') {
              var amrFinal = [];
              _.map($scope.amrHeaderIndex, function(dd, i) {
                amrFinal.push(d._source.bit_map[dd]);
              });
              d._source.bit_map = amrFinal;
              amr.push(d);
            } else if ($scope.cnt == 'emeia') {
              var emeiaFinal = [];
              _.map($scope.emeiaHeaderIndex, function(dd, i) {
                emeiaFinal.push(d._source.bit_map[dd]);
              });
              d._source.bit_map = emeiaFinal;
              emeia.push(d);
            } else {
              var apacFinal = [];
              _.map($scope.apacHeaderIndex, function(dd, i) {
                apacFinal.push(d._source.bit_map[dd]);
              });
              d._source.bit_map = apacFinal;
              apac.push(d);
            }
          });
          // console.log(emeiaFinal);
          if ($scope.cnt == 'amr') {
            $scope.loadOneItemPerSec({
              hits: {
                hits: amr
              }
            });
          } else if ($scope.cnt == 'emeia') {
            $scope.loadOneItemPerSec({
              hits: {
                hits: emeia
              }
            });
          } else {
            $scope.loadOneItemPerSec({
              hits: {
                hits: apac
              }
            });
          }
        });
      } else {
        $scope.label = "LSP Mesh Detail - All Routers - " + $scope.cnt;
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
      if ($scope.cnt == 'pri_cnt' || $scope.cnt == 'sec_cnt' || $scope.cnt == 'ter_cnt') {
        $scope.label = "LSP Mesh Detail - Active Router - " + $scope.cnt;
        // $http.get('/proxy/lsp_grid_complete/stats/_search?size=10000&pretty&query:matchAll&sort=sort_rtr:asc&_source=pri_cnt').success(function(d) {
        $http.get('/api/lspmesh/source/' + $scope.cnt).success(function(d) {
          $scope.loadOneItemPerSec(d);
        });
      } else if ($scope.cnt == 'amr' || $scope.cnt == 'emeia' || $scope.cnt == 'apac' || $scope.cntSrc == 'region_r1' || $scope.cntSrc == 'region_r2' || $scope.cntSrc == 'region_r3') {
        $scope.label = "LSP Mesh Detail - Active Router - " + _.upperCase($scope.cnt);
        // $http.get('/proxy/lsp_grid_complete/stats/_search?size=10000&pretty&query:matchAll&sort=sort_rtr:asc&_source=pri_cnt').success(function(d) {
        $http.get('/api/lspmesh/source/bit_map').success(function(d) {
          var amr = [],
            emeia = [],
            apac = [];
          _.map(d.hits.hits, function(d) {
            // if (d._id.substring(0, 2) == 'us') {
            if ($scope.cnt == 'amr') {
              var amrFinal = [];
              _.map($scope.amrHeaderIndex, function(dd, i) {
                amrFinal.push(d._source.bit_map[dd]);
              });
              d._source.bit_map = amrFinal;
              amr.push(d);
            // } else if (d._id.substring(0, 2) == 'de' || d._id.substring(0, 2) == 'gb' || d._id.substring(0, 2) == 'uk') {
            } else if ($scope.cnt == 'emeia') {
              var emeiaFinal = [];
              _.map($scope.emeiaHeaderIndex, function(dd, i) {
                emeiaFinal.push(d._source.bit_map[dd]);
              });
              d._source.bit_map = emeiaFinal;
              emeia.push(d);
            } else {
              var apacFinal = [];
              _.map($scope.apacHeaderIndex, function(dd, i) {
                apacFinal.push(d._source.bit_map[dd]);
              });
              d._source.bit_map = apacFinal;
              apac.push(d);
            }
          });
          // console.log(emeiaFinal);
          if ($scope.cnt == 'amr') {
            $scope.loadOneItemPerSec({
              hits: {
                hits: amr
              }
            });
          } else if ($scope.cnt == 'emeia') {
            $scope.loadOneItemPerSec({
              hits: {
                hits: emeia
              }
            });
          } else {
            $scope.loadOneItemPerSec({
              hits: {
                hits: apac
              }
            });
          }
        });
      } else {
        // var key;
        // if($scope.cntSrc == '1')
        //   key = "AMR";
        // else if($scope.cntSrc == '2')
        //   key = "EMEIA";
        // else
        //   key = "APAC";
        $scope.label = "LSP Mesh Detail - Active Router - " + $scope.cnt;
        // $http.get('/proxy/lsp_grid_complete/stats/_search?size=10000&pretty&query:matchAll&sort=sort_rtr:asc&_source=pri_cnt').success(function(d) {
        // $http.get('/proxy/lsp_grid/stats/_search?size=10000&sort=sort_rtr:asc&q=region:'+$scope.cntSrc+'&_source=bit_map,src_rtr').success(function(d) {
        //   $scope.loadOneItemPerSec(d);
        // });
        $http.get('/api/lspmesh/source/' + $scope.cnt).success(function(d) {
          $scope.loadOneItemPerSec(d);
        });
      }
    }
  };

  // All Routers Dropdown
  $scope.arDropdown = function(ar) {
    if (ar == 'false')
      $window.location.href = '#/allroutes/true';
    else
      $window.location.href = '#/lspmeshdetails';
  }

  // StateView Dropdown
  $scope.svDropdown = function(sv) {
    $window.location.href = '#/stateview/' + sv;
  }

  // Primary, Secondary and Teritary Dropdown
  $scope.pstDropdown = function(cnt) {
    var cnt;
    if (cnt == null)
      cnt = "bit_map";
    if(cnt == 'region_r1' || cnt == 'region_r2' || cnt == 'region_r3'){
      $window.location.href = '#/dropdown/' + cnt + '/' + $scope.flag;
    } else if(cnt == "source") {
      $window.location.href = '#/lspmeshdetails';
    } else {
      $window.location.href = '#/dropdown/' + cnt + '/' + $scope.flag + '/' + $scope.cntSrc;
    }
  }

  // load header
  $scope.header = function(d) {
    $scope.dataHeader = d.hits.hits;
    _.map(d.hits.hits, function(d) {
      var replaceSymbol = [];
      _.map(d._source.dst_routers, function(d) {
        replaceSymbol.push(d.replace(/_/g, '-'));
      });
      var amr = [],
        emeia = [],
        apac = [];
      $scope.amrHeaderIndex = [];
      $scope.emeiaHeaderIndex = [];
      $scope.apacHeaderIndex = [];
      _.map(replaceSymbol, function(d, i) {
        if (d.substring(0, 2) == 'us') {
          $scope.amrHeaderIndex.push(i);
          amr.push(d);
        } else if (d.substring(0, 2) == 'de' || d.substring(0, 2) == 'gb' || d.substring(0, 2) == 'uk') {
          $scope.emeiaHeaderIndex.push(i);
          emeia.push(d);
        } else {
          $scope.apacHeaderIndex.push(i);
          apac.push(d);
        }
      });
      if ($scope.cnt == 'amr') {
        $scope.tableHeader = amr;
      } else if ($scope.cnt == 'emeia') {
        $scope.tableHeader = emeia;
      } else if ($scope.cnt == 'apac') {
        $scope.tableHeader = apac;
      } else {
        $scope.tableHeader = replaceSymbol; 
      }
      // $scope.tableHeader = replaceSymbol;
      // console.log("tableHeader : ",$scope.tableHeader);
    });
  }

  // load one row/sec
  $scope.loadOneItemPerSec = function(d) {
    if ($scope.loadAll !== undefined) {
      $timeout.cancel($scope.loadAll);
    }
    // console.log(d.hits.hits.length);
    // for (var i = 1; i < d.hits.hits.length; i++) {
    for (var i = 1; i < 10; i++) {
      $scope.loadAll = (function(y) {
        $timeout(function() {
          if (y != 0) {
            var nexttendata = d.hits.hits.slice(y - 1, y);
            $scope.tableStats = _.concat($scope.tableStats, nexttendata);
          }
        }, i * 300);
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
