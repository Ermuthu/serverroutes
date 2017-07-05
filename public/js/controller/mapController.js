 
ngElastic.controller('mapController', function($scope, $http, $routeParams, $window, $timeout, $q) {
 
  $scope.initMapController = function() {
    $scope.sourceDropdown = [{ "value": "1", "text": "AMR" }, { "value": "2", "text": "EMEIA" }, { "value": "3", "text": "APAC" }];
    $scope.destDropdown = [{ "value": "1", "text": "AMR" }, { "value": "2", "text": "EMEIA" }, { "value": "3", "text": "APAC" }];
    $scope.map = "Connected Chart";
    $scope.isLoading = false;
    // Init Map onLoad
    $http.get('/api/maplinks').success(function(d) {
      $scope.links(d);
    }).error(function(e) {
      console.log(e);
    });
    $scope.nodes();
  };
  $scope.draw = SVG('drawing').size(3650, 1060)
    .click(function(d) {
      $("#onhover").empty();
    });
  $scope.drawonhover = SVG('onhover').size(500, 100);
  // $scope.draw = SVG('drawing').size(3650, 1060).style('position: absolute;width: 1056px;height: 500px;top: 0px; left: 0px;zoom:.35');
  // $scope.draw = SVG('drawing')
  //  .size(3650, 1060)
  //  .style('position: absolute;width: 1056px;height: 500px;top: 0px; left: 0px')
  //  .mouseup(function(d) {
  //    console.log(d);
  //  })
  //  .mousedown(function(d) {
  //    this.fill({ border: '2px red' })
  //    console.log("mousedown",d);
  //  });
 
  if($routeParams.sourcenames != undefined){
    var rp = $routeParams.sourcenames,
      Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}},
      decode = Base64.decode(rp);
    var arrayFromParams =  _.split(decode, ',');
    var toStr = _.toString(arrayFromParams);
    var removeUnderscore = _.replace(toStr, /[_-]/g, ",");
    $scope.node_coor= _.split(removeUnderscore, ',');
  }
 
  // stroke color based on bw_used value
  $scope.strokeColor = function (bw) {
    if(bw>0 && bw<11)
      return "#4D72E3";
    else if(bw>10 && bw<21)
      return "#48CCCD";
    else if(bw>20 && bw<31)
      return "#00FF00";
    else if(bw>30 && bw<41)
      return "#B1FB17";
    else if(bw>40 && bw<51)
      return "#FFFF00";
    else if(bw>50 && bw<61)
      return "#FDD017";
    else if(bw>60 && bw<71)
      return "#FBB117";
    else if(bw>70 && bw<81)
      return "#F87217";
    else if(bw>80 && bw<91)
      return "#FF0000";
    else if(bw>90 && bw<101)
      return "#F6358A";
    else
      return '#4D72E3';
  };
 
  $scope.defaultMap = function(d) {
    $scope.path = $scope.draw.clear();
    $scope.src = null;
    $scope.dest = null;
    $http.get('/api/maplinks').success(function(l) {
      $scope.links(l);
    }).error(function(e) {
      console.log(e);
    });
    $scope.nodes();
  }
 
  // Dropdown's
  $scope.dropdown = function(src, dest) {
    if(!_.isUndefined(src) && !_.isUndefined(dest) && !_.isNull(src) && !_.isNull(dest)) {
      $scope.path = $scope.draw.clear();
      console.log(src,dest);
      if(src == 1 && dest == 1){
        $http.get('/api/maplinkshighlight').success(function(d) {
          $scope.links(d);
        }).error(function(e) {
          console.log(e);
        });
      } else {
        $http.get('/api/maplinks').success(function(d) {
          $scope.links(d);
        }).error(function(e) {
          console.log(e);
        });
      }
      $scope.nodes();
    }
  }
 
  $scope.links = function(d) {
    $scope.isLoading = true;
    $scope.linkHits = d.hits.hits;
    var path;
    _.map($scope.linkHits, function(d) {
      var linear = $scope.draw.gradient('linear', function(stop) {
        stop.at({offset: '50%', color: $scope.strokeColor(d._source.in_bw_used)})
        stop.at({offset: '50%', color: $scope.strokeColor(d._source.out_bw_used)})
      });
      /*
      * 1. if src_y and dst_y are same, add 1 to src_y
      * 2. else if src_x and dst_x are same, add 1 to src_x
      * 3. else src_y and dst_y (default)
      */
      if(d._source.src_y === d._source.dst_y) {
        var src_y = parseInt(d._source.src_y)+1;
       
        $scope.path = $scope.draw.path('M'+d._source.src_x+' '+src_y+' L'+d._source.dst_x+' '+d._source.dst_y)
          .click(function() {
            $window.location.href = '#/status/'+d._source.source+''+d._source.bundle_intf;
          })
          .attr('class','cursor-pointer')
          .mouseover(function(mover) {
            $scope.drawonhover = SVG('onhover').size(700, 200)
              .attr('class','mover')
              .style({position: 'absolute', top: mover.pageY, left: mover.pageX, border: '5px solid', background: '#CCC'});
            $scope.drawonhover.rect(150,30).move(10,78).fill('#e74c3c').stroke('#c0392b');       
            $scope.pathonhover = $scope.drawonhover
            	.path('M160 91 L525 90')
            	.back()
              .move(160,90)
              .stroke(linear)
              .stroke({ width: 3, linecap: 'round', linejoin: 'round'});
            $scope.drawonhover.rect(150,30).move(525,78).fill('#e74c3c').stroke('#c0392b')
            $scope.drawonhover.text(d._source.source)
              .move(18,85)
              .font({ fill: '#fff', size: 16, weight: 'bolder' })
              .attr('class','cursor-pointer');
            $scope.drawonhover.text(d._source.dest)
              .move(535,85)
              .font({ fill: '#fff', size: 16, weight: 'bolder' })
              .attr('class','cursor-pointer');
          })
          // .mouseout(function(mout) {
          // 	$("#onhover").empty();
          // });
      } else if(d._source.src_x === d._source.dst_x) {
        var src_x = parseInt(d._source.src_x)+1;
        $scope.path = $scope.draw.path('M'+src_x+' '+d._source.src_y+' L'+d._source.dst_x+' '+d._source.dst_y)
          .click(function() {
            $window.location.href = '#/status/'+d._source.source+''+d._source.bundle_intf;
          })
          .attr('class','cursor-pointer')
          .mouseover(function(mover) {
            $scope.drawonhover = SVG('onhover').size(700, 200)
              .attr('class','mover')
              .style({position: 'absolute', top: mover.pageY, left: mover.pageX, border: '5px solid', background: '#CCC'});
            $scope.drawonhover.rect(150,30).move(10,78).fill('#e74c3c').stroke('#c0392b');       
            $scope.pathonhover = $scope.drawonhover
            	.path('M160 91 L525 90')
            	.back()
              .move(160,90)
              .stroke(linear)
              .stroke({ width: 3, linecap: 'round', linejoin: 'round'});
            $scope.drawonhover.rect(150,30).move(525,78).fill('#e74c3c').stroke('#c0392b')
            $scope.drawonhover.text(d._source.source)
              .move(18,75)
              .font({ fill: '#fff', size: 16, weight: 'bolder' })
              .attr('class','cursor-pointer');
            $scope.drawonhover.text(d._source.dest)
              .move(535,75)
              .font({ fill: '#fff', size: 16, weight: 'bolder' })
              .attr('class','cursor-pointer');
          })
          // .mouseout(function(mout) {
          // 	$("#onhover").empty();
          // });
      } else {
        $scope.path = $scope.draw.path('M'+d._source.src_x+' '+d._source.src_y+' L'+d._source.dst_x+' '+d._source.dst_y)
          .click(function() {
            $window.location.href = '#/status/'+d._source.source+''+d._source.bundle_intf;
          })
          .attr('class','cursor-pointer')
          .mouseover(function(mover) {
            $scope.drawonhover = SVG('onhover').size(700, 200)
              .attr('class','mover')
              .style({position: 'absolute', top: mover.pageY, left: mover.pageX, border: '5px solid', background: '#CCC'});
            $scope.drawonhover.rect(150,30).move(10,78).fill('#e74c3c').stroke('#c0392b');       
            $scope.pathonhover = $scope.drawonhover
            	.path('M160 91 L525 90')
            	.back()
              .move(160,90)
              .stroke(linear)
              .stroke({ width: 3, linecap: 'round', linejoin: 'round'});
            $scope.drawonhover.rect(150,30).move(525,78).fill('#e74c3c').stroke('#c0392b')
            $scope.drawonhover.text(d._source.source)
              .move(18,75)
              .font({ fill: '#fff', size: 16, weight: 'bolder' })
              .attr('class','cursor-pointer');
            $scope.drawonhover.text(d._source.dest)
              .move(535,75)
              .font({ fill: '#fff', size: 16, weight: 'bolder' })
              .attr('class','cursor-pointer');
          })
          // .mouseout(function(mout) {
          // 	$("#onhover").empty();
          // });
      }
      $scope.path.stroke(linear)
      $scope.path.stroke({ width: 5, linecap: 'round', linejoin: 'round'})
      $scope.path.back();
    });
    $scope.isLoading = false;
  }
 
  // Nodes
  $scope.nodes = function() {
    $http.get('/api/mapnodes').success(function(n) {
      $scope.nodeHits = n.hits.hits;
      _.map($scope.nodeHits, function(d) {
        // draw rectangle
        $scope.draw.rect(100,20)
          .fill('#e74c3c')
          .move(d._source.x - 6,d._source.y - 13)
          .stroke('#c0392b')
          .attr('class','cursor-pointer')
          // anchor tag
          .click(function() {
            $window.location.href = '#/status/'+d._id;
          })
        // text inside rectangle
        $scope.draw.text(d._id)
          .move(d._source.x,d._source.y-5)
          .font({ fill: '#fff', size: 11 })
          .attr('class','cursor-pointer')
          .click(function() {
            $window.location.href = '#/status/'+d._id;
          });
      });
    }).error(function(e) {
      console.log(e);
    });
  }
});