ngElastic.controller('mapHighlightController', function($scope, $http, $routeParams, $window, $timeout, $q) {

  $scope.initStatusMap = function() {
    $scope.map = "LSP Map";
    $scope.isLoading = false;
  };

  if ($routeParams.sourcenames != undefined) {
    var rp = $routeParams.sourcenames,
      Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}},
      decode = Base64.decode(rp);
    var arrayFromParams = _.split(decode, ',');
    var toStr = _.toString(arrayFromParams);
    var removeUnderscore = _.replace(toStr, /[_-]/g, ",");
    $scope.node_coor = _.split(removeUnderscore, ',');
  }

  // Re-arrange the params to array of object for src and dest
  var five = 5;
  var connLineData = [];
  if ($routeParams.sourcenames != undefined) {
    for (var i = 0; i < $scope.node_coor.length - 3; i += 2) {
      connLineData.push({
        src_x: parseInt($scope.node_coor[i]) + five,
        src_y: parseInt($scope.node_coor[i + 1]) + five,
        dest_x: parseInt($scope.node_coor[i + 2]) + five,
        dest_y: parseInt($scope.node_coor[i + 3]) + five
      });
    }
  }
  $scope.highlightNode = connLineData;

  // $http.get('http://10.12.22.10:9200/map_link_info/config/_search?size=10000').success(function(l) {
  $http.get('/api/maplinks').success(function(l) {
    $scope.isLoading = true;
    $scope.linkHits = l.hits.hits;
  }).error(function(e) {
    console.log(e);
  });

  // $http.get('http://10.12.22.10:9200/map_info/config/_search?size=10000').success(function(n) {
  $http.get('/api/mapnodes').success(function(n) {
    $scope.nodeHits = n.hits.hits;
  }).error(function(e) {
    console.log(e);
  });

});