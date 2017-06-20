ngElastic.controller('mapHighlightController', function($scope, $http, $routeParams, $window, $timeout, $q) {

    $scope.initStatusMap = function() {
        $scope.map = "LSP Map";
        $scope.isLoading = false;
    };
    if ($routeParams.sourcenames != undefined) {
        var rp = $routeParams.sourcenames,
            Base64 = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                decode: function(e) {
                    var t = "";
                    var n, r, i;
                    var s, o, u, a;
                    var f = 0;
                    e = e.replace(/[^A-Za-z0-9+/=]/g, "");
                    while (f < e.length) {
                        s = this._keyStr.indexOf(e.charAt(f++));
                        o = this._keyStr.indexOf(e.charAt(f++));
                        u = this._keyStr.indexOf(e.charAt(f++));
                        a = this._keyStr.indexOf(e.charAt(f++));
                        n = s << 2 | o >> 4;
                        r = (o & 15) << 4 | u >> 2;
                        i = (u & 3) << 6 | a;
                        t = t + String.fromCharCode(n);
                        if (u != 64) {
                            t = t + String.fromCharCode(r)
                        }
                        if (a != 64) {
                            t = t + String.fromCharCode(i)
                        }
                    }
                    t = Base64._utf8_decode(t);
                    return t
                },
                _utf8_encode: function(e) {
                    e = e.replace(/rn/g, "n");
                    var t = "";
                    for (var n = 0; n < e.length; n++) {
                        var r = e.charCodeAt(n);
                        if (r < 128) {
                            t += String.fromCharCode(r)
                        } else if (r > 127 && r < 2048) {
                            t += String.fromCharCode(r >> 6 | 192);
                            t += String.fromCharCode(r & 63 | 128)
                        } else {
                            t += String.fromCharCode(r >> 12 | 224);
                            t += String.fromCharCode(r >> 6 & 63 | 128);
                            t += String.fromCharCode(r & 63 | 128)
                        }
                    }
                    return t
                },
                _utf8_decode: function(e) {
                    var t = "";
                    var n = 0;
                    var r = c1 = c2 = 0;
                    while (n < e.length) {
                        r = e.charCodeAt(n);
                        if (r < 128) {
                            t += String.fromCharCode(r);
                            n++
                        } else if (r > 191 && r < 224) {
                            c2 = e.charCodeAt(n + 1);
                            t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                            n += 2
                        } else {
                            c2 = e.charCodeAt(n + 1);
                            c3 = e.charCodeAt(n + 2);
                            t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                            n += 3
                        }
                    }
                    return t
                }
            },
            decode = Base64.decode(rp);
        // console.log(decode);
        var arrayFromParams = _.split(decode, ',');
        // console.log(arrayFromParams);
        var toStr = _.toString(arrayFromParams);
        // console.log(toStr);
        var removeUnderscore = _.replace(toStr, /[_-]/g, ",");
        $scope.node_coor = _.split(removeUnderscore, ',');
        // console.log($scope.node_coor);
        $scope.node_coord = $scope.node_coor.join(" ");
        // console.log($scope.node_coor.join(" "));
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
        // console.log("$scope.linkHits",$scope.linkHits)
    }).error(function(e) {
        console.log(e);
    });

    // $http.get('http://10.12.22.10:9200/map_info/config/_search?size=10000').success(function(n) {
    $http.get('/api/mapnodes').success(function(n) {
        $scope.nodeHits = n.hits.hits;
    }).error(function(e) {
        console.log(e);
    });

    // stroke color based on bw_used value
    $scope.strokeColor = function(bw) {
        // console.log(bw);
        if (bw > 0 && bw < 11)
            return "#ecf0f1";
        else if (bw > 10 && bw < 21)
            return "#ecf0f1";
        else if (bw > 20 && bw < 31)
            return "#ecf0f1";
        else if (bw > 30 && bw < 41)
            return "#ecf0f1";
        else if (bw > 40 && bw < 51)
            return "#ecf0f1";
        else if (bw > 50 && bw < 61)
            return "#ecf0f1";
        else if (bw > 60 && bw < 71)
            return "#ecf0f1";
        else if (bw > 70 && bw < 81)
            return "#ecf0f1";
        else if (bw > 80 && bw < 91)
            return "#ecf0f1";
        else if (bw > 90 && bw < 101)
            return "#ecf0f1";
        // else if(bw == '-')
        //  return 'red';
        // else if(bw==-0)
        //  return 'yellow';
        else
            return '#ecf0f1';
    };
    // coords
    $scope.coords = function(x1, x2, y1, y2) {
        // console.log("hEllo");
        if (x2 === y2) {
            var x2new = parseInt(x2) + 1;
            return 'M' + x1 + ' ' + x2new + ' L' + y1 + ' ' + y2;
        } else if (x1 === y1) {
            var x1new = parseInt(x1) + 1;
            return 'M' + x1new + ' ' + x2 + ' L' + y1 + ' ' + y2
        } else {
            return 'M' + x1 + ' ' + x2 + ' L' + y1 + ' ' + y2
        }
    }

    // get the center 1500/430/1500/100 965 800 165
    $scope.lineCenter = function(x1, x2, y1, y2) {
        // console.log(x1,x2,y1,y2);
        var x;
        var y;
        if (x1 > y1) {
            x = (parseInt(x1) - parseInt(x2)) / 2;
            y = (parseInt(y1) - parseInt(y2)) / 2;
            return x - y
        } else {
            x = (parseInt(x1) + parseInt(x2)) / 2;
            y = (parseInt(y1) + parseInt(y2)) / 2;
            return y - x;
        }
    };
    $scope.limitMissRoute = function(val) {
        return replaceSymbol(val.replace(/_/g, '-'));
    };

});