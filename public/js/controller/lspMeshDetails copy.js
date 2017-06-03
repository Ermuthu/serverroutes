ngElastic.controller('lspMeshDetailsController', function($scope, $http, $timeout, $interval, cfpLoadingBar) {
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
  $scope.allRowsLoaded = false;
  $scope.disableButton=false;

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
    var loadAll;
    $http.get('/api/lspmeshdetailstats').success(function(d) {
      cfpLoadingBar.start();
      // $scope.tableStats = d.hits.hits;
      // $scope.tableStatsCopy = d.hits.hits;
      console.log("Length : ",d.hits.hits.length);
      if(d.hits.hits.length > 10) {
        // cfpLoadingBar.start();
        $scope.tableStats = d.hits.hits.slice(0,10);
        // cfpLoadingBar.complete();
      } else {
        $scope.tableStats =  d.hits.hits;
      }
      if(loadAll !== undefined) {
        $timeout.cancel(loadAll);
      }
      // loadAll = $timeout(function() {
      //   $scope.tableStats = d.hits.hits.slice(0,19);
      // }, 1500);
      var res  = {
        "_index": "lsp_grid",
        "_type": "stats",
        "_id": "gbmnc1_bbisp_gw1",
        "_score": null,
        "_source": {
          "sort_rtr": "gbmnc1_bbisp_gw1",
          "bit_map": [
            8,
            7,
            8,
            7,
            7,
            7,
            5,
            5,
            8,
            6,
            -1,
            6,
            6,
            8,
            4,
            6,
            8,
            5,
            6,
            7,
            7,
            7,
            6,
            8,
            8,
            5,
            7,
            7,
            7,
            7,
            7,
            4,
            6,
            8,
            7,
            7,
            7,
            8,
            7,
            6,
            5,
            7,
            7,
            7,
            0,
            0,
            7,
            6,
            7,
            4,
            6,
            6,
            7,
            5,
            6,
            6,
            0,
            0,
            6,
            5,
            5,
            5,
            0,
            0,
            6,
            7,
            6,
            5,
            6,
            7,
            6,
            7,
            5,
            7,
            7,
            7,
            6,
            6,
            8,
            5,
            7,
            8,
            6,
            7,
            6,
            8,
            7,
            8,
            8,
            6,
            6,
            6,
            6,
            8,
            6,
            6,
            5,
            8,
            4,
            8,
            6,
            7,
            6,
            4,
            8,
            4,
            6,
            8,
            5,
            7,
            0,
            0
          ],
          "src_rtr": "gbmnc1-bbisp-gw1",
          "region": 2,
          "mesh_timestamp": 1495595286
        }
      };
      // for (var i = 20; i < d.hits.hits.length; i += 1) {
      //   loadAll = (function(i){  // i will now become available for the someMethod to call
      //     $timeout(function() {
      //       if(i!=0){
      //         var nexttendata = d.hits.hits.slice(i-1,i);
      //         // console.log(d.hits.hits.slice(0,i));
      //         // console.log(_.concat(d.hits.hits.slice(0,i),[res]))
      //         $scope.tableStats = _.concat($scope.tableStats,nexttendata);
      //         console.log($scope.tableStats);
      //       }
      //     }, i *1000);
      //   })(i); // Pass in i here
        // loadAll = $timeout(function(y) {
        //   //if(y==0)
        //   //return y=1;
        //   if(y!=0){
        //     $scope.tableStats = d.hits.hits.slice(0,y);
        //     console.log(d.hits.hits.slice(0, y));
        //   }
        // }, i * 1500, i);
      // }
      
      for (var i = 20; i < 30; i += 1) {
        loadAll = (function(y){ 
          $timeout(function() {
            if(y!=0){
              var nexttendata = d.hits.hits.slice(y-1,y);
              $scope.tableStats = _.concat($scope.tableStats,nexttendata);
              console.log($scope.tableStats);
            }
            if(y == 29) {
              $scope.disableButton = true;
            }

          }, 150);
        })(i);
      }
      cfpLoadingBar.complete();
    });
  };

  $scope.$watch('disableButton', function(db) {
    console.log(db);
  });

  // Get the values of table status
  $scope.getTableStats = function(ts) {
    $scope.isLoading = true;
    return ts;
    $scope.isLoading = false;
  };

  // updated the value on Show Complete button click
  $scope.updateTableWithShowComplete = function() {
    console.log($scope.showCompleteModel);
    if($scope.showCompleteModel == true) {
      // $http.get('/api/lspmeshdetailstatsold').success(function(d) {
      //   $scope.tableStats = d.hits.hits;
      // });
    } else {
      // $scope.tableStats = $scope.tableStatsCopy;
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