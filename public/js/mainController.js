var ngElastic = angular.module('ngElastic',['ngRoute', 'nvd3', 'ui.bootstrap', 'infinite-scroll', 'ngAnimate', 'angular-loading-bar', 'fixedTableHeader', 'datatables', 'datatables.fixedcolumns']);

ngElastic.filter('typesFilter', function() {
  return function(clients, selectedCompany) {
    if (!angular.isUndefined(clients) && !angular.isUndefined(selectedCompany) && selectedCompany.length > 0) {
      var tempClients = [];
      angular.forEach(selectedCompany, function (id) {
        angular.forEach(clients, function (client) {
          if(angular.equals(client._source.path_type, id.toString())) {
            tempClients.push(client);
          }
        });
      });
      return tempClients;
    }else{
      return clients;
    }
  };
});

ngElastic.factory('lineChartService', function($http){
  return {
    getdata: function(){
    	return $http.get('/api/linechart'); // You Have to give Correct Url either Local path or api etc 
    }
  };
});

ngElastic.filter('wildcard', function() {
  return function(list, value) {
    if (!value) {
      return list;
    }

    var escaped = value.replace(/([.+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    var formatted = escaped.replace('*', '.*');

    if (formatted.indexOf('*') === -1) {
      formatted = '.*' + formatted + '.*'
    }

    var output = []

    angular.forEach(list, function(item) {
     var regex = new RegExp('^' + formatted + '$', 'im');
     if (traverse(item, regex)) {
       output.push(item);
     }
   });
    return output
  }

  function traverse(item, regex) {
    for (var prop in item) {
      //angular property like hash
      if(prop[0] === '$$'){
        return;  
      }
      
      var value = item[prop];
      
      if (typeof value === 'object') {
        traverse(value, regex);
      }

      if(regex.test(value)){
        return true;
      }
    }
  }
});

ngElastic.config(['$routeProvider', '$locationProvider' , 'cfpLoadingBarProvider', function($routeProvider, $locationProvider, cfpLoadingBarProvider) {
	// Router
	$routeProvider.
  when('/', {
    templateUrl: 'views/routes.html',
    controller: 'mainController'
  }).
  when('/routes', {
    templateUrl: 'views/routes.html',
    controller: 'mainController'
  }).
  when('/route/:routename', {
    templateUrl: 'views/ip.html',
    controller: 'ipController'
  }).
  when('/logs', {
    templateUrl: 'views/logs.html',
    controller: 'tabController'
  }).
  when('/status', {
    templateUrl: 'views/status.html',
    controller: 'statusController'
  }).
  when('/statushistory/:lspname', {
    templateUrl: 'views/statushistory.html',
    controller: 'statusHistoryController'
  }).
  when('/404', {
    templateUrl: 'views/404.html',
    controller: 'notFound'
  }).
  when('/regex', {
    templateUrl: 'views/regex.html',
    controller: 'regexController'
  }).
  when('/status/:dst_interface', {
    templateUrl: 'views/linkRoute.html',
    controller: 'linkRouteController'
  }).
  when('/link', {
    templateUrl: 'views/link.html',
    controller: 'linkController'
  }).
  when('/table', {
    templateUrl: 'views/table.html',
    controller: 'tableController'
  }).
  when('/lspmesh', {
    templateUrl: 'views/lspmesh.html',
    controller: 'lspMeshController'
  }).
  when('/lspmeshdetails', {
    templateUrl: 'views/lspmeshdetails.html',
    controller: 'lspMeshDetailsController'
  }).
  when('/allroutes/:alflag?', {
    templateUrl: 'views/lspmeshallroutes.html',
    controller: 'lspMeshDetailsAllRoutesController'
  }).
  when('/stateview/:flag?', {
    templateUrl: 'views/lspmeshstateview.html',
    controller: 'lspMeshDetailsStateViewController'
  }).
  when('/dropdown/:cnt/:svflag?/:tcksrc?', {
    templateUrl: 'views/lspmeshcnt.html',
    controller: 'lspMeshDetailsCntController'
  }).
  when('/chart/:pathname', {
    templateUrl: 'views/connectedgraph.html',
    controller: 'graphController'
  }).
  when('/map', {
    templateUrl: 'views/mapzoom.html',
    controller: 'mapZoomController'
  }).
  when('/map/:sourcenames', {
    templateUrl: 'views/maphighlight.html',
    controller: 'mapHighlightController'
  }).
  otherwise({
   redirectTo: '/'
  });

  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.includeBar = true;
  cfpLoadingBarProvider.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';
  // cfpLoadingBarProvider.spinnerTemplate = '<div id="loading-bar"><span class="fa fa-spinner">Loading...</div>';;

	// Remove hash(#) from Url
	// $locationProvider.html5Mode({
	// 	enabled: true,
 //  		requireBase: false
	// });
}]);

ngElastic.controller('regexController', function($scope, $http) {
  $scope.init = function() {
    $http.get('https://jsonplaceholder.typicode.com/users/').success(function(data) {
      $scope.result = data;
    }).error(function(e) {
      console.log(e);
    });
  }
});

ngElastic.controller('mainController', function($scope, $http) {
	$scope.findIP = function() {
		// var url = 'http://10.12.21.14:9200/mpls_lsps/_search?search_type=count&pretty&source={%22aggregations%22:{%22states%22:{%22terms%22:{%22field%22:%22router_name%22},%22aggs%22:{%22hits%22:{%22top_hits%22:{%22size%22:1}}}}}}';
		$http.get('/api/routes').success(function(data) {
			$scope.routes = data.aggregations.states.buckets;
			var extractData =  data.aggregations.states.buckets.map(function(data) {
				$scope.total = data.doc_count;
			});
		}).error(function(err) {
			console.log(err.message);
		});
	};
});

ngElastic.controller('ipController', function($scope, $http, $routeParams) {
  // Declaration
  $scope.up = "UP";
  $scope.down = "DOWN";
  $scope.tbd = "TBD";
	// Load Initial Data
	// var url = 'http://10.12.21.14:9200/mpls_lsps/_search?q=_id:'+$routeParams.id+'&pretty=true';
	$scope.init = function() {
		$http.get('/api/route/'+$routeParams.routername).success(function(data) {
			$scope.data = data.hits.hits;
    }).error(function(err) {
     console.log(err.message);
   });
  }

	// send POST Request
	$scope.postData = function(d) {
		$scope.routerInfo = {"LSPS": d};
		$http.post('/api/applyanother', $scope.routerInfo).success(function(res) {
			toastr.success("Posted Success");
		}).error(function(res) {
			toastr.info('Internal server error in another Router');
		});
	};

	$scope.checkbox = {};
	$scope.checkbox.selectAll = false;
	$scope.search = {};
	$scope.search.name = '';

	$scope.searchParams = function() {

 };
 $scope.selectAllFiltered = function() {
   if ($scope.checkbox.selectAll) {
    $scope.checkbox.selectAll = false;
  } else {
    $scope.checkbox.selectAll = true;
  }

  if (!$scope.search.name) {
    for (var i = 0; i < $scope.data.length; i++) {
      if (angular.isUndefined($scope.data[i].isSelected)) {
       $scope.data[i].isSelected = $scope.checkbox.selectAll;
     } else {
       $scope.data[i].isSelected = !$scope.data[i].isSelected;
     }
   }
 } else {
  for (var i = 0; i < $scope.filtered.length; i++) {
    if (angular.isUndefined($scope.filtered[i].isSelected)) {
     $scope.filtered[i].isSelected = $scope.checkbox.selectAll;
   } else {
     $scope.filtered[i].isSelected = !$scope.filtered[i].isSelected;
   }
 }
}
}

$scope.unCheckAll = function() {
  angular.forEach($scope.data, function(d) {
    d.isSelected = false;
  });
}

	// remove selected routes
	$scope.apply = function() {
		var newDataList = [];
		var postData = [];
		angular.forEach($scope.data, function(d) {
			if(!d.isSelected) {
				newDataList.push(d);
			}else{
				postData.push(d);
			}
		});
		// $scope.data = newDataList;
		$scope.postData(postData);
	};

	// checkAll the routes
	$scope.checkAll = function() {
		angular.forEach($scope.data, function(data) {
			data.isDelete = $scope.selectAll;
		});
	};

  $scope.placement = {
    selected: 'top'
  };
});

// TabController
ngElastic.controller('tabController', function($scope, $http, $uibModal, lineChartService, $interval) {
	$scope.isCollapsed = true;
	$scope.tabInit = function() {
		$http.get('/api/logs').success(function(data) {
			$scope.routes = data.hits.hits;
		}).error(function(err) {
			console.log("Error loading data");
		});
	};

  $scope.showModal = function(d) {
    console.log(d);
    if(d == "")
      $scope.remarks = "No Remarks"
    else
      $scope.remarks = d;
    var modalInstance = $uibModal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: 'sm',
      resolve: {
        remarks: function(){
          return $scope.remarks
        }
      }
    });
  }

	// Line Chart
	$scope.options = {
    chart: {
      type: 'lineChart',
      height: 450,
      margin : {
        top: 20,
        right: 20,
        bottom: 40,
        left: 75
      },
            // tooltip:{
            // 	enabled: false
            // },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            // useInteractiveGuideline: false,
            dispatch: {
              tooltipShow: function(e){ console.log('! tooltip SHOW !')},
              tooltipHide: function(e){console.log('! tooltip HIDE !')},
              beforeUpdate: function(e){ console.log('! before UPDATE !')}
            },
            xAxis: {
              axisLabel: 'Time',
              tickFormat: function(d) {
                return d3.time.format('%d/%b %H:%M')(new Date(d * 1000));
              }
            },
            yAxis: {
              axisLabel: 'Timetaken'
            }
          }
        };

    // Line chart data
    $scope.data = sinAndCos();

    // callback function to handle the events (click, mouseover and mouseout)
    $scope.callback = function(scope, element){
    	// Add a click event
      d3.selectAll('.nv-point-paths').on('click', function(e){
        // $scope.showModal = function(d) {
        //  if(d == "")
        //    $scope.remarks = "No Remarks"
        //  else
        //    $scope.remarks = d;
        //  var modalInstance = $uibModal.open({
        //    templateUrl: 'myModalContent.html',
        //    controller: 'ModalInstanceCtrl',
        //    size: 'sm',
        //    resolve: {
        //          remarks: function(){
        //              return $scope.remarks
        //          }
        //        }
        //  });
        // }
  			// d3.selectAll('.nvtooltip').each(function(){
        //  			this.style.setProperty('display', 'block', 'important');
        //  		});
        $scope.showModal(e[0].key);
      });
    	// Clear tooltip on mouseout
    	d3.selectAll('.nv-point-paths').each(function(){
        this.addEventListener('mouseout', function(){
          d3.selectAll('.nvtooltip').each(function(){
            this.style.setProperty('display', 'none', 'important');
          });
        }, false);
      });
		// Clear toolip on onload using mouseover
		d3.selectAll('.nv-point-paths').each(function(){
      this.addEventListener('mouseover', function(){
        d3.selectAll('.nvtooltip').each(function(){
          this.style.setProperty('display', 'none', 'important');
        });
      }, false);
    });
 };

  	// To generate data for Line Chart
    function lineChartDatas() {
    	var chartInput = [];
    	lineChartService.getdata().success(function(d) {
    		var hits = d.hits.hits;
    		_.map(hits, function(d) {
    			//Data is represented as an array of {x,y} pairs.
    			chartInput.push({
    				x: new Date(d._source.received_ts).getTime(),
    				router_name: d._source.router_name,
    				y: d._source.time_taken
    			});
    		});
    	}).error(function(err) {

    	});
    	//Line chart data should be sent as an array of series objects.
    	return [
      {
    			values: chartInput,	//values - represent the array of {x,y} 
    			key: 'Router',		//key  - the name of the series.
          color: '#ff7f0e'	//color - optional: choose your own line color.
                // strokeWidth: 2,		//strokeWidth - Width of the line.
                // classed: 'dashed'	//classed - 
              }
              ];
            }

    // Dummy data for Line Chart
    function sinAndCos() {
      var sin = [],sin2 = [],
      cos = [];
      for (var i = 0; i < 100; i++) {
        sin.push({x: i, y: Math.sin(i/10)});
        sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
        cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
      }
      var data = [{"x": 0,"y": 0},{"x": 1,"y": 0.09983341664682815},{"x": 2,"y": 0.19866933079506122},{"x": 3,"y": 0.29552020666133955},{"x": 4,"y": 0.3894183423086505},{"x": 5,"y": 0.479425538604203},{"x": 6,"y": 0.5646424733950354},{"x": 7,"y": 0.644217687237691},{"x": 8,"y": 0.7173560908995228},{"x": 9,"y": 0.7833269096274834},{"x": 10,"y": 0.8414709848078965}];
      return [
      {
                values: data,      //values - represents the array of {x,y} data points
                key: 'Testing Wave', //key  - the name of the series.
                color: '#ff7f0e',  //color - optional: choose your own line color.
                strokeWidth: 2,
                classed: 'dashed'
              }
              ];
            };

    // Time Difference
    var difference,
    daysDifference,
    hoursDifference,
    minutesDifference,
    secondsDifference;
    $scope.timeDifference = function(date1,date2) {
    	difference = date2 - date1;
      daysDifference = Math.floor(difference/1000/60/60/24);
      difference -= daysDifference*1000*60*60*24
      hoursDifference = Math.floor(difference/1000/60/60);
      difference -= hoursDifference*1000*60*60
      minutesDifference = Math.floor(difference/1000/60);
      difference -= minutesDifference*1000*60
      secondsDifference = Math.floor(difference/1000);
		// console.log('difference = ' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ');
  }
  $scope.timeDifference($scope.date1, $scope.date2);
	// $scope.showModal = function(d) {
	// 	if(d == "")
	// 		$scope.remarks = "No Remarks"
	// 	else
	// 		$scope.remarks = d;
	// 	var modalInstance = $uibModal.open({
	// 		templateUrl: 'myModalContent.html',
	// 		controller: 'ModalInstanceCtrl',
	// 		size: 'sm',
	// 		resolve: {
	// 	        remarks: function(){
	// 	          	return $scope.remarks
	// 	        }
	//       	}
	// 	});
	// }
});

// statusController
ngElastic.controller('statusController', function($scope, $http) {
  // $scope.isCollapsed = true;
  // $scope.selectedTypes = [];
  // On page load
  $scope.loadStatus = function() {
    $http.get('/api/status').success(function(data) {
      $scope.isLoading = true;
      $scope.status = data.hits.hits;
      $scope.totalItems = $scope.status.length;
      //Time Difference
      $scope.status.map(function(d){
        //variable declaration
        if(d._source.applied_timestamp != undefined)
         return $scope.config_applied_time = new Date(d._source.applied_timestamp*1000);
        var now = new Date();
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
      });
    }).error(function(e) {
      console.log(e);
    });
    $scope.isLoading = false;
  };

  // searchBox
  $scope.searchBox = function(src, dest, ss) {
    console.log(src,dest,ss);
  }

  $scope.exchangeValues = function(src, dest) {
    $scope.source_rtr = dest;
    $scope.dest_rtr = src;
  }

  // LSP watch
  $scope.$watch('LSPSearch', function(findLsp) {
    var copyOfStatus = $scope.status;
    $scope.statusCopy = angular.copy(copyOfStatus);
    // var getIds = [];
    // _.map($scope.status, function(d) {
    //   getIds.push(d._id);
    // });
    // _.indexOf(getIds, findLsp);
    
    if(findLsp != undefined){
      $http.get('/api/status/lsp/'+findLsp).success(function(lsps) {
        console.log(lsps);
      }).error(function(err) {
        console.log(err);
      });
    }
  });
  // Pagination
  $scope.viewby = 10;
  $scope.currentPage = 4;
  $scope.itemsPerPage = $scope.viewby;
  $scope.maxSize = 5; //Number of pager buttons to show
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };
  $scope.setItemsPerPage = function(num) {
    $scope.itemsPerPage = num;
    $scope.currentPage = 1; //reset to first paghe
  }

	// $scope.emailPattern = /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/;
  $scope.emailPattern = (/['"]+/g, '');
  function escapeRegExp(string) {
    return string.replace(/([.+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
   // Primary Config
  $scope.primaryConfig = function(pcn, pc, pi) {
    if(pcn != undefined && pc != undefined && pi != undefined){
      var arr = [];
      var result = pcn.map(function(val, index){
        if(typeof pc === 'string')
          arr.push(val+'('+pc+')');
        if(typeof pc === 'object')
          arr.push(val + ' ' + pi[index] + ' (' + pc[index] + ')');
      });
      return arr;
    }
  };

  // Secondary config
  $scope.secondaryConfig = function(pcn, pc) {
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
  }

  // Teritary Config
  $scope.teritaryConfig = function(pcn, pc) {
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
  }
  
  $scope.getText = function(label){
    if(label != undefined)
      return label.split('$');
  }

  $scope.adminGroupPrimary = function(agp) {
    if(agp != undefined) {
      var removeWhiteSpaces = agp.replace(/\s+/g, ' ').trim(),
      removespechar = removeWhiteSpaces.replace(/[.*+?^{}'()|[\]\\]/g, "");
      return removespechar.split('$');
    }
  }

  $scope.adminGroupSecondary = function(agp) {
    if(agp != undefined) {
      var removeWhiteSpaces = agp.replace(/\s+/g, ' ').trim(),
      removespechar = removeWhiteSpaces.replace(/[.*+?^{}'()|[\]\\]/g, "");
      return removespechar.split('$');
    }
  }

  $scope.uniqPCN = function(d) {
    // Create Base64 Object
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
    var uniq =  _.sortedUniq(d);
    return Base64.encode(_.join(uniq, ','));
  }
});

// For Modal
ngElastic.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, remarks) {

  $scope.remarks = remarks;

  $scope.ok = function () {
    $uibModalInstance.close($scope.remarks);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

// notFound Controller
ngElastic.controller('notFound', function($scope) {
	$scope.title = "Not FOUND";
});