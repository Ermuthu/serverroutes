ngElastic.directive('goDiagram', function($http) {
  return {
    restrict: 'E',
    template: '<div></div>',  // just an empty DIV element
    replace: true,
    scope: { model: '=goModel' },
    link: function(scope, element, attrs) {
      console.log(element);
      console.log(attrs);
      if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
      var $ = go.GraphObject.make;
      // function strokeColor(bw,d) {
      //   if(bw>0 && bw<11){
      //     return 'green'
      //   } 
      //   return 'blue'
      // }
      // var rainbow = new go.Brush(go.Brush.Linear);
      // rainbow.addColorStop(0,  strokeColor('d', 'd._source.out_bw_used'));
      // rainbow.addColorStop(1, "red");

      // create a Diagram for the given HTML DIV element
      var diagram = $(go.Diagram, element[0],{
        nodeTemplate: 
          $(go.Node, "Auto", { 
            locationSpot: go.Spot.Center
          }, {
              width: 120,
              height: 15,
              locationSpot: go.Spot.Center
          },
          // new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          // $(go.Shape, "RoundedRectangle", new go.Binding("fill", "color"),
          new go.Binding("location"),
          $(go.Shape, { fill: "#e74c3c",stroke:'#c0392b' }, {
            portId: "", cursor: "pointer", strokeWidth: 0,
            // fromLinkable: true, toLinkable: true,
            // fromLinkableSelfNode: true, toLinkableSelfNode: true,
            // fromLinkableDuplicates: true, toLinkableDuplicates: true
          }),
          $(go.TextBlock, { margin: 0,stroke: "#eee"},
            new go.Binding("text", "key"))
          ),
        linkTemplate: 
          $(go.Link, {
            routing: go.Link.AvoidsNodes,
            reshapable: true,
            resegmentable: true
          }, 
          $(go.Shape,
            // new go.Binding("stroke", "in"),
            {
              fill: $(go.Brush, go.Brush.Linear, { 0: "#FEC901", 1: "red" }),
            },
            new go.Binding("stroke", "out"),
          ),
          // $(go.Shape,
          //   new go.Binding("stroke", "in"),
          //   new go.Binding("fill", "in"),
          //   { fromArrow: "circle", strokeWidth: 2 },
          //   { segmentIndex: 0, segmentFraction: .5}
          // ),
          // $(go.Shape,
          //   new go.Binding("stroke", "out"),
          //   new go.Binding("fill", "out"),
          //   { toArrow: "circle", strokeWidth: 2 },
          //   { segmentIndex: 0, segmentFraction: .5}
          // ),
            { relinkableFrom: true, relinkableTo: true },
            // $(go.Shape),
            $(go.Shape, { toArrow: "Standard", stroke: null, strokeWidth: 0 })
          ),
          initialContentAlignment: go.Spot.Center,
          // "ModelChanged": updateAngular,
          // "ChangedSelection": updateSelection,
          "undoManager.isEnabled": true,
          "linkReshapingTool": new OrthogonalLinkReshapingTool()
      });

      // whenever a GoJS transaction has finished modifying the model, update all Angular bindings
      function updateAngular(e) {
        if (e.isTransactionFinished) {
          scope.$apply();
        }
      }

      // update the Angular model when the Diagram.selection changes
      function updateSelection(e) {
        diagram.model.selectedNodeData = null;
        var it = diagram.selection.iterator;
        while (it.next()) {
          var selnode = it.value;
          // ignore a selected link or a deleted node
          if (selnode instanceof go.Node && selnode.data !== null) {
            diagram.model.selectedNodeData = selnode.data;
            break;
          }
        }
        scope.$apply();
      }

      // notice when the value of "model" changes: update the Diagram.model
      scope.$watch("model", function(newmodel) {
        if(newmodel != undefined) {
          var oldmodel = diagram.model;
          if (oldmodel !== newmodel) {
            diagram.removeDiagramListener("ChangedSelection", updateSelection);
            diagram.model = newmodel;
            diagram.addDiagramListener("ChangedSelection", updateSelection);
          }
        }
      });
    }
  };
});

ngElastic.controller('mapController', function($scope, $http, $routeParams, $window, $timeout, $q) {
  $scope.initMapController = function() {
    // Init Map onLoad
    var nodes = [
      { key: "krsel6-bbisp-gw1", location: new go.Point(50, 30) , loc: "0 0"},
      { key: "jptyo5-bbisp-gw2", location: new go.Point(650, 70) , loc: "100 0"},
      { key: "jptyo7-bbisp-gw2", location: new go.Point(700, 170) ,loc: "0 100"},
      { key: "hkhkg1-bbisp-gw1", location: new go.Point(60, 400) ,loc: "100 100"},
      { key: "hkhkg1-bbisp-gw2", location: new go.Point(220, 400) },
      { key: "sgsin8-bbisp-gw1", location: new go.Point(250, 630) },
      { key: "ussea4-bbisp-gw2", location: new go.Point(900, 70) },
      { key: "ussea4-bb-cr1",   location: new go.Point(1100, 140) },
      { key: "usprz3-bb-pe1",    location: new go.Point(1120, 200) },
      { key: "usnkq1-bb-cr1",    location: new go.Point(850, 435) },
      { key: "usscz2-bbisp-gw2", location: new go.Point(1000, 625) },
      { key: "ussjc2-bbisp-gw2", location: new go.Point(1000, 750) },
      { key: "usmsc2-bb-pe1",    location: new go.Point(1150, 925) },
      { key: "usmsc2-bb-pe2",    location: new go.Point(1300, 925) },
      { key: "usmsc2-bb-cr4",    location: new go.Point(1450, 1080) },
      { key: "usrno1-bb-pe2",    location: new go.Point(1490, 500) },
      { key: "usrno1-bb-cr2",    location: new go.Point(1660, 400) },
      { key: "usden5-bb-cr2",    location: new go.Point(1870, 270) },
      { key: "usmes1-bbisp-gw2", location: new go.Point(1950, 30) },
      { key: "usdal4-bbisp-gw2", location: new go.Point(1870, 790) },
      { key: "ushou1-bb-sw1",    location: new go.Point(1790, 900) },
      { key: "ushou1-bbisp-gw1", location: new go.Point(1790, 970) },
      { key: "usnyc3-bbisp-gw2", location: new go.Point(2470, 175) },
      { key: "usewr1-bbisp-gw2", location: new go.Point(2670, 175) },
      { key:  "usbos2-bb-sw2",   location: new go.Point(2360, 70) },
      { key:  "usxqm1-bb-cr1", location: new go.Point(2500, 250) },
      { key: "usqas3-bb-pe1", location: new go.Point(2500, 320) },
      { key: "usqas3-bb-pe2", location: new go.Point(2500, 370) },
      { key: "usuqo4-bb-cr2", location: new go.Point(2500, 625) },
      { key: "usmia1-bb-sw4", location: new go.Point(2350, 1040) },
      { key: "gbmnc1-bb-sw2", location: new go.Point(3450, 130) },
      { key: "gbmnc1-bbisp-gw1", location: new go.Point(3600, 20) },
      { key: "uklon6-bbisp-gw2", location: new go.Point(2970, 110) },
      { key: "defra1-bbisp-gw2", location: new go.Point(3160, 440) },
      { key: "defra1-bbisp-gw1", location: new go.Point(3160, 510) },
      { key: "cntnj1-bbisp-gw1", location: new go.Point(50,280) },
      { key: "jptyo5-bbisp-gw1", location: new go.Point(420,  70) },
      { key: "sgsin3-bbisp-gw1", location: new go.Point(250, 700) },
      { key: "sgsin3-bbisp-gw2", location: new go.Point(390, 700) },
      { key: "ausyd2-bbisp-gw1", location: new go.Point(450, 850) },
      { key: "usprz2-bb-cr2",    location: new go.Point(1500, 100) },
      { key: "usscz2-bb-cr2",    location: new go.Point(850, 675) },
      { key: "ussjc2-bbisp-gw1", location: new go.Point(1150, 750) },
      { key: "uslax1-bb-cr2",    location:    new go.Point(975, 1080) },
      { key: "usrno1-bb-pe1", location: new go.Point(1490, 450) },
      { key: "usden5-bbisp-gw1", location: new go.Point(1730, 180) },
      { key: "uschi6-bb-pe2", location: new go.Point(2135, 270) },
      { key: "uschi6-bb-pe3", location: new go.Point(2265, 270) },
      { key: "uslxa1-bbisp-gw1", location: new go.Point(1800, 430) },
      { key: "usdal4-bb-cr1", location: new go.Point(1730, 720) },
      { key: "usewr1-bbisp-gw1", location: new go.Point(2670, 80) },
      { key: "usbos2-bbisp-gw2", location: new go.Point(2650, 20) },
      { key: "usqas3-bb-pe3", location: new go.Point(2670, 320) },
      { key: "usqas3-bb-pe4", location: new go.Point(2670, 370) },
      { key: "usuqo4-bbisp-gw1", location: new go.Point(2370, 525) },
      { key: "usuqo4-bb-cr1", location: new go.Point(2500, 525) },
      { key: "usuqo1-bbisp-gw1", location: new go.Point(2260, 400) },
      { key: "usmia1-bbisp-gw2", location: new go.Point(2500, 1040) },
      { key: "usmia1-bb-sw1", location: new go.Point(2500, 850) },
      { key: "sesto4-bbisp-gw2", location: new go.Point(3530, 170) },
      { key: "dkblp1-bbisp-gw2", location: new go.Point(3700, 240) },
      { key: "dedus1-bbisp-gw1", location: new go.Point(3700, 430) },
      { key: "deber3-bbisp-gw1", location: new go.Point(3700, 550) },
      { key: "inbom2-bbisp-gw1", location: new go.Point(3350, 700) },
      { key: "cntnj1-bbisp-gw2", location: new go.Point(50, 350) },
      { key: "cnsha10-bbisp-gw1", location: new go.Point(160, 200) },
      { key: "krsel6-bbisp-gw2", location: new go.Point(50, 90) },
      { key: "jposa3-bbisp-gw2", location: new go.Point(240, 130)},
      { key: "hkhkg3-bbisp-gw2", location: new go.Point(220, 480)},
      { key: "ussea4-bbisp-gw1", location: new go.Point(900, 140)},
      { key: "usprz3-bb-cr2", location: new go.Point(1240, 100)},
      { key: "usprz2-bb-pe2", location: new go.Point(1370, 200)},
      { key: "uslax1-bbisp-gw1", location: new go.Point(880, 875)},
      { key: "usmsc2-bb-pe3", location: new go.Point(1300, 1025)},
      { key: "usmsc2-bb-cr1", location: new go.Point(1000, 1080)},
      { key: "usmsc2-bb-cr2", location: new go.Point(1150, 1080)},
      { key: "usmsc2-bb-cr3", location: new go.Point(1300, 1080)},
      { key: "usrno3-bb-cr1", location: new go.Point(1380, 240)},
      { key: "usrno3-bb-cr2", location: new go.Point(1380, 290)},
      { key: "usden5-bbisp-gw2", location: new go.Point(1870, 180)},
      { key: "usden5-bb-cr1", location: new go.Point(1730, 270)},
      { key: "uschi5-bb-cr1", location: new go.Point(2110, 190)},
      { key: "uschi5-bb-cr2", location: new go.Point(2260, 190)},
      { key: "uslxa1-bbisp-gw2", location: new go.Point(1800, 500)},
      { key: "usatl4-bb-cr2", location: new go.Point(2060, 1100)},
      { key: "usatl4-bbisp-gw1", location: new go.Point(1920, 1160)},
      { key: "usbos2-bb-sw1", location: new go.Point(2360, 20)},
      { key: "usxqm1-bb-cr2", location: new go.Point(2620, 250)},
      { key: "usqas2-bbisp-gw1", location: new go.Point(2380, 320)},
      { key: "usuqo4-bbisp-gw2", location: new go.Point(2370, 625)},
      { key: "usmia1-bb-sw2", location: new go.Point(2395, 850)},
      { key: "usmia1-bb-sw3", location: new go.Point(2350, 950)},
      { key: "gbmnc1-bb-sw1", location: new go.Point(3450, 20)},
      { key: "gbmnc1-bbisp-gw2", location: new go.Point(3600, 90)},
      { key: "uklon5-bbisp-gw2", location: new go.Point(3120, 155)},
      { key: "ieork1-bbisp-gw1", location: new go.Point(3300, 50)},
      { key: "nlams2-bbisp-gw2", location: new go.Point(3460, 250)},
      { key: "nlams2-bbisp-gw1", location: new go.Point(3460, 320)},
      { key: "frcch1-bbisp-gw1", location: new go.Point(3160, 315)},
      { key: "sesto4-bbisp-gw1", location: new go.Point(3700, 170)},
      { key: "dkblp1-bbisp-gw1", location: new go.Point(3700, 310)},
      { key: "inmaa1-bbisp-gw1", location: new go.Point(3200, 700)},
      { key: "inmaa1-bbisp-gw2", location: new go.Point(3200, 800)},
      { key: "usprz2-bb-pe1",    location: new go.Point(1370, 150)},
      { key: "usnkq1-bb-cr2", location: new go.Point(850, 535)},
      { key: "usscz2-bbisp-gw1", location: new go.Point(1000, 525)},
      { key: "uslax1-bb-cr1", location: new go.Point(825, 1080)},
      { key: "usmsc2-bb-pe4", location: new go.Point(1150, 1025)},
      { key: "usrno3-bb-pe1", location: new go.Point(1250, 350)},
      { key: "usrno3-bb-pe2", location: new go.Point(1250, 400)},
      { key: "uschi5-bbisp-gw2", location: new go.Point(2110, 110)},
      { key: "uschi6-bb-pe4", location: new go.Point(2335, 270)},
      { key: "usdal4-bbisp-gw1", location: new go.Point(1730, 790)},
      { key: "ushou1-bbisp-gw2", location: new go.Point(1790, 1040)},
      { key: "usnyc3-bbisp-gw1", location: new go.Point(2470, 80)},
      { key: "usbos2-bbisp-gw1", location: new go.Point(2500, 20)},
      { key: "usqas2-bbisp-gw2", location: new go.Point(2380, 370)},
      { key: "usuqo1-bbisp-gw2", location: new go.Point(2260, 475)},
      { key: "uklon5-bbisp-gw1", location: new go.Point(3120, 65)},
      { key: "defra3-bbisp-gw2", location: new go.Point(3330, 440)},
      { key: "defra3-bbisp-gw1", location: new go.Point(3330, 510)},
      { key: "frcch1-bbisp-gw2", location: new go.Point(3160, 375)},
      { key: "dedus1-bbisp-gw2", location: new go.Point(3700, 360)},
      { key: "cnsha10-bbisp-gw2", location: new go.Point(160, 260)},
      { key: "jposa3-bbisp-gw1", location: new go.Point(240, 60)},
      { key: "jptyo7-bbisp-gw1", location: new go.Point(420, 170)},
      { key: "hkhkg3-bbisp-gw1", location: new go.Point(60, 480)},
      { key: "sgsin8-bbisp-gw2", location: new go.Point(390, 630)},
      { key: "ausyd2-bbisp-gw2", location: new go.Point(600, 850)},
      { key: "ussea4-bb-cr2", location: new go.Point(1100,70)},
      { key: "usprz3-bb-pe2", location: new go.Point(1120, 250)},
      { key: "usprz3-bb-cr1", location: new go.Point(1240, 50)},
      { key: "usprz2-bb-cr1", location: new go.Point(1500, 50)},
      { key: "usscz2-bb-cr1", location: new go.Point(850, 575)},
      { key: "uslax1-bbisp-gw2",location: new go.Point(880, 950)},
      { key: "usrno1-bb-cr1", location: new go.Point(1660, 350)},
      { key: "usmes1-bbisp-gw1", location: new go.Point(1800, 30)},
      { key: "uschi5-bbisp-gw1", location: new go.Point(2260, 110)},
      { key: "uschi6-bb-pe1", location: new go.Point(2035, 270)},
      { key: "usdal4-bb-cr2", location: new go.Point(1870, 720)},
      { key: "usatl4-bb-cr1", location: new go.Point(1920, 1100)},
      { key: "usatl4-bbisp-gw2", location: new go.Point(2060, 1160)},
      { key: "ushou1-bb-sw2", location: new go.Point(1790, 1100)},
      { key: "usuqo1-bb-cr1", location: new go.Point(2370, 400)},
      { key: "usuqo1-bb-cr2", location: new go.Point(2370, 475)},
      { key: "usmia1-bbisp-gw1", location: new go.Point(2500, 950)},
      { key: "uklon6-bbisp-gw1", location: new go.Point(2970, 20)},
      { key: "ieork1-bbisp-gw2", location: new go.Point(3300, 110)},
      { key: "deber3-bbisp-gw2", location: new go.Point(3700, 480)},
      { key: "inbom2-bbisp-gw2", location: new go.Point(3350, 800)}
    ];
    var links = [];
    $http.get('/api/maplinks').success(function(link) {
      var removeDupObj = _.uniqWith(link.hits.hits, $scope.predicateAndModifier);
      _.map(removeDupObj, function(obj) {
        links.push({
          from: obj._source.source,
          to: obj._source.dest,
          in: $scope.getColor(obj._source.in_bw_used),
          out: $scope.getColor(obj._source.out_bw_used),
        });
      });
      $scope.model = new go.GraphLinksModel(
        nodes,
        links
      );
      $scope.model.selectedNodeData = null;
    }).error(function(err) {
      console.log(err);
    });
  }

  $scope.getColor = function(bw) {
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
  }

  // Remove Duplicates Starts
  $scope.addToArray = function(val1, val2) {
    // return _.isArray(val1) ? val1.concat(val2) : [val1].concat(val2); // Add all the values into an array
    return val2; // Replace with new value
  }

  $scope.modifyObjs = function(a, b) {
    b._source.in_bw_used = $scope.addToArray(b._source.in_bw_used, a._source.in_bw_used);
    b._source.out_bw_used = $scope.addToArray(b._source.out_bw_used, a._source.out_bw_used);
    return true;
  }

  $scope.predicateAndModifier = function(a, b) {
    return a._source.dest === b._source.dest && a._source.src === b._source.src && a._source.src_x === b._source.src_x && a._source.src_y === b._source.src_y && a._source.dst_x === b._source.dst_x && a._source.dst_y === b._source.dst_y && $scope.modifyObjs(a, b);
  }

  $scope.predict = function(a, b) {
    return a._source.dest === b._source.dest && a._source.source === b._source.source && $scope.modifyObjs(a, b);
  }

  // Remove Duplicates Ends

  // $scope.model = new go.GraphLinksModel(
  //   // [
  //   //   { key: 1, name: "Alpha", color: "lightblue" },
  //   //   { key: 2, name: "Beta", color: "orange" },
  //   //   { key: 3, name: "Gamma", color: "lightgreen" },
  //   //   { key: 4, name: "Delta", color: "pink" }
  //   // ],
  //   // [
  //   //   { from: "Alpla", to: "Beta" },
  //   //   { from: 1, to: 3 },
  //   //   { from: 2, to: 2 },
  //   //   { from: 3, to: 4 },
  //   //   { from: 4, to: 1 }
  //   // ]);
  //   $scope.nodes,
  //   [ ]
  // );
  // $scope.model.selectedNodeData = null;
 
  // $scope.initMapController = function() {
  //   $scope.sourceDropdown = [{ "value": "1", "text": "AMR" }, { "value": "2", "text": "EMEIA" }, { "value": "3", "text": "APAC" }];
  //   $scope.destDropdown = [{ "value": "1", "text": "AMR" }, { "value": "2", "text": "EMEIA" }, { "value": "3", "text": "APAC" }];
  //   $scope.map = "Connected Chart";
  //   $scope.isLoading = false;
  //   // Init Map onLoad
  //   // $http.get('/api/maplinks').success(function(d) {
  //   //   $scope.links(d);
  //   // }).error(function(e) {
  //   //   console.log(e);
  //   // });
  //   $q.all([$http.get('/api/maplinks'),
  //    $http.get('/api/maplinksdyncolor')])
  //   .then(function(res) {
  //     $scope.mapLinks = _.uniqWith(res[0].data.hits.hits, $scope.predicateAndModifier);
  //     $scope.maplinksdyncolor = _.uniqWith(res[1].data.hits.hits, $scope.predicateAndModifier);
  //     $scope.links(_.unionWith($scope.mapLinks, $scope.maplinksdyncolor, $scope.predict));
  //   });
  //   $scope.nodes();
  // };

  // // $scope.draw = SVG('drawing').size(3650, 1060).attr('id', 'testing').style('display: inline; width: inherit; min-width: inherit; max-width: inherit; height: inherit; min-height: inherit; max-height: inherit;');
  // $scope.draw = SVG('drawing').size(4000, 1500).attr('id', 'testing');
  // $scope.drawonhover = SVG('onhover').size(500, 100);
  // // $scope.draw = SVG('drawing').size(3650, 1060).style('position: absolute;width: 1056px;height: 500px;top: 0px; left: 0px;zoom:.35');
  // // $scope.draw = SVG('drawing')
  // //  .size(3650, 1060)
  // //  .style('position: absolute;width: 1056px;height: 500px;top: 0px; left: 0px')
  // //  .mouseup(function(d) {
  // //    console.log(d);
  // //  })
  // //  .mousedown(function(d) {
  // //    this.fill({ border: '2px red' })
  // //    console.log("mousedown",d);
  // //  });
 
  // if($routeParams.sourcenames != undefined){
  //   var rp = $routeParams.sourcenames,
  //     Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}},
  //     decode = Base64.decode(rp);
  //   var arrayFromParams =  _.split(decode, ',');
  //   var toStr = _.toString(arrayFromParams);
  //   var removeUnderscore = _.replace(toStr, /[_-]/g, ",");
  //   $scope.node_coor= _.split(removeUnderscore, ',');
  // }
 
  // // stroke color based on bw_used value
  // $scope.strokeColor = function (b, src) {
  //   if(src == "in" && b._source.src_x > b._source.dst_x) {
  //     if(b._source.in_bw_used == 4.246460){
  //       console.log("Im in 1", b._source.in_bw_used, b._source.out_bw_used);
  //     }
  //     return $scope.getColor(b._source.out_bw_used);
  //   } else if(src == "out" && b._source.src_x > b._source.dst_x) {
  //     if(b._source.in_bw_used == 4.246460){
  //       console.log("Im in 2", b._source.in_bw_used, b._source.out_bw_used);
  //     }
  //     return $scope.getColor(b._source.in_bw_used);
  //   } else if(src == "in" && b._source.src_x < b._source.dst_x) {
  //     if(b._source.in_bw_used == 4.246460){
  //       console.log("Im in 3", b._source.in_bw_used, b._source.out_bw_used);
  //     }
  //     return $scope.getColor(b._source.in_bw_used);
  //   } else if(src == "out" && b._source.src_x < b._source.dst_x) {
  //     if(b._source.in_bw_used == 4.246460){
  //       console.log("Im in 4", b._source.in_bw_used, b._source.out_bw_used);
  //     }
  //     return $scope.getColor(b._source.out_bw_used);
  //   } else {
  //     if(b == 4.246460){
  //       console.log("Im in 5", b, b);
  //     }
  //     return $scope.getColor(b);
  //   }
  // };

  // $scope.getColor = function(bw) {
  //   if(bw>0 && bw<11)
  //     return "#4D72E3";
  //   else if(bw>10 && bw<21)
  //     return "#48CCCD";
  //   else if(bw>20 && bw<31)
  //     return "#00FF00";
  //   else if(bw>30 && bw<41)
  //     return "#B1FB17";
  //   else if(bw>40 && bw<51)
  //     return "#FFFF00";
  //   else if(bw>50 && bw<61)
  //     return "#FDD017";
  //   else if(bw>60 && bw<71)
  //     return "#FBB117";
  //   else if(bw>70 && bw<81)
  //     return "#F87217";
  //   else if(bw>80 && bw<91)
  //     return "#FF0000";
  //   else if(bw>90 && bw<101)
  //     return "#F6358A";
  //   else
  //     return '#4D72E3';
  // }
 
  // $scope.defaultMap = function(d) {
  //   $scope.path = $scope.draw.clear();
  //   $scope.src = null;
  //   $scope.dest = null;
  //   $http.get('/api/maplinks').success(function(l) {
  //     $scope.links(l);
  //   }).error(function(e) {
  //     console.log(e);
  //   });
  //   $scope.nodes();
  // }
 
  // // Dropdown's
  // $scope.dropdown = function(src, dest) {
  //   if(!_.isUndefined(src) && !_.isUndefined(dest) && !_.isNull(src) && !_.isNull(dest)) {
  //     $scope.path = $scope.draw.clear();
  //     console.log(src,dest);
  //     if(src == 1 && dest == 1){
  //       $http.get('/api/maplinkshighlight').success(function(d) {
  //         $scope.links(d);
  //       }).error(function(e) {
  //         console.log(e);
  //       });
  //     } else {
  //       $http.get('/api/maplinks').success(function(d) {
  //         $scope.links(d);
  //       }).error(function(e) {
  //         console.log(e);
  //       });
  //     }
  //     $scope.nodes();
  //   }
  // }

  // // Remove Duplicates Starts
  // $scope.addToArray = function(val1, val2) {
  //   // return _.isArray(val1) ? val1.concat(val2) : [val1].concat(val2); // Add all the values into an array
  //   return val2; // Replace with new value
  // }

  // $scope.modifyObjs = function(a, b) {
  //   b._source.in_bw_used = $scope.addToArray(b._source.in_bw_used, a._source.in_bw_used);
  //   b._source.out_bw_used = $scope.addToArray(b._source.out_bw_used, a._source.out_bw_used);
  //   return true;
  // }

  // $scope.predicateAndModifier = function(a, b) {
  //   return a._source.dest === b._source.dest && a._source.src === b._source.src && a._source.src_x === b._source.src_x && a._source.src_y === b._source.src_y && a._source.dst_x === b._source.dst_x && a._source.dst_y === b._source.dst_y && $scope.modifyObjs(a, b);
  // }

  // $scope.predict = function(a, b) {
  //   return a._source.dest === b._source.dest && a._source.source === b._source.source && $scope.modifyObjs(a, b);
  // }

  // // Remove Duplicates Ends
 
  // $scope.links = function(data) {
  //   $scope.isLoading = true;
  //   var path;
  //   _.map(data, function(d) {
  //     var linear = $scope.draw.gradient('linear', function(stop) {
  //       stop.at({offset: '50%', color: $scope.strokeColor(d, 'in')})
  //       stop.at({offset: '50%', color: $scope.strokeColor(d, 'out')})
  //     });
  //     var hoverLinear = $scope.draw.gradient('linear', function(stop) {
  //       stop.at({offset: '50%', color: $scope.strokeColor(d._source.in_bw_used)})
  //       stop.at({offset: '50%', color: $scope.strokeColor(d._source.out_bw_used)})
  //     });
      
  //     * 1. if src_y and dst_y are same, add 1 to src_y
  //     * 2. else if src_x and dst_x are same, add 1 to src_x
  //     * 3. else src_y and dst_y (default)
      
  //     if(d._source.src_y != undefined && d._source.dst_y != undefined && d._source.src_x != undefined && d._source.dst_y != undefined) { 
  //       if(d._source.src_y === d._source.dst_y) {
  //         var src_y = parseInt(d._source.src_y)+1;
         
  //         $scope.path = $scope.draw.path('M'+d._source.src_x+' '+src_y+' L'+d._source.dst_x+' '+d._source.dst_y)
  //           .click(function() {
  //             $window.location.href = '#/status/'+d._source.source+''+d._source.bundle_intf;
  //           })
  //           .attr('class','cursor-pointer')
  //           .mouseover(function(mover) {
  //             $scope.drawonhover = SVG('onhover').size(700, 200)
  //               .attr('class','mover')
  //               .style({position: 'absolute', top: mover.pageY, left: mover.pageX, border: '5px solid', background: '#CCC'});
  //             $scope.drawonhover.rect(150,30).move(10,78).fill('#e74c3c').stroke('#c0392b');       
  //             $scope.pathonhover = $scope.drawonhover
  //              .path('M160 91 L525 90')
  //              .back()
  //               .move(160,90)
  //               .stroke(hoverLinear)
  //               .stroke({ width: 3, linecap: 'round', linejoin: 'round'});
  //             // $scope.drawonhover.rect(150,30).move(525,78).fill('#e74c3c').stroke('#c0392b')
  //             $scope.drawonhover.rect(150,30).move(515,78).fill('#e74c3c').stroke('#c0392b')
  //             //Percentage on hover
  //             $scope.drawonhover.text(d._source.in_bw_used)
  //               .move(150,130)
  //               .font({ fill: ' #ff0000', size: 18, weight: 'bolder' })
  //             $scope.drawonhover.text(d._source.out_bw_used)
  //               .move(450,130)
  //               .font({ fill: ' #ff0000', size: 18, weight: 'bolder' })
  //             // Text on hover
  //             $scope.drawonhover.text(d._source.source)
  //               .move(18,85)
  //               .font({ fill: '#fff', size: 16, weight: 'bolder' })
  //               .attr('class','cursor-pointer');
  //             $scope.drawonhover.text(d._source.dest)
  //               .move(522,85)
  //               .font({ fill: '#fff', size: 16, weight: 'bolder' })
  //               .attr('class','cursor-pointer');
  //           })
  //           .mouseout(function(mout) {
  //            $("#onhover").empty();
  //           });
  //       } else if(d._source.src_x === d._source.dst_x) {
  //         var src_x = parseInt(d._source.src_x)+1;
  //         $scope.path = $scope.draw.path('M'+src_x+' '+d._source.src_y+' L'+d._source.dst_x+' '+d._source.dst_y)
  //           .click(function() {
  //             $window.location.href = '#/status/'+d._source.source+''+d._source.bundle_intf;
  //           })
  //           .attr('class','cursor-pointer')
  //           .mouseover(function(mover) {
  //             $scope.drawonhover = SVG('onhover').size(700, 200)
  //               .attr('class','mover')
  //               .style({position: 'absolute', top: mover.pageY, left: mover.pageX, border: '5px solid', background: '#CCC'});
  //             $scope.drawonhover.rect(150,30).move(10,78).fill('#e74c3c').stroke('#c0392b');       
  //             $scope.pathonhover = $scope.drawonhover
  //              .path('M160 91 L525 90')
  //              .back()
  //               .move(160,90)
  //               .stroke(hoverLinear)
  //               .stroke({ width: 3, linecap: 'round', linejoin: 'round'});
  //             $scope.drawonhover.rect(150,30).move(515,78).fill('#e74c3c').stroke('#c0392b')
  //             //Percentage on hover
  //             $scope.drawonhover.text(d._source.in_bw_used)
  //               .move(150,130)
  //               .font({ fill: ' #ff0000', size: 18, weight: 'bolder' })
  //             $scope.drawonhover.text(d._source.out_bw_used)
  //               .move(450,130)
  //               .font({ fill: ' #ff0000', size: 18, weight: 'bolder' })
  //             // Text on hover
  //             $scope.drawonhover.text(d._source.source)
  //               .move(18,85)
  //               .font({ fill: '#fff', size: 16, weight: 'bolder' })
  //               .attr('class','cursor-pointer');
  //             $scope.drawonhover.text(d._source.dest)
  //               .move(522,85)
  //               .font({ fill: '#fff', size: 16, weight: 'bolder' })
  //               .attr('class','cursor-pointer');
  //           })
  //           .mouseout(function(mout) {
  //            $("#onhover").empty();
  //           });
  //       } else {
  //         $scope.path = $scope.draw.path('M'+d._source.src_x+' '+d._source.src_y+' L'+d._source.dst_x+' '+d._source.dst_y)
  //           .click(function() {
  //             $window.location.href = '#/status/'+d._source.source+''+d._source.bundle_intf;
  //           })
  //           .attr('class','cursor-pointer')
  //           .mouseover(function(mover) {
  //             $scope.drawonhover = SVG('onhover').size(700, 200)
  //               .attr('class','mover')
  //               .style({position: 'absolute', top: mover.pageY, left: mover.pageX, border: '5px solid', background: '#CCC'});
  //             $scope.drawonhover.rect(150,30).move(10,78).fill('#e74c3c').stroke('#c0392b');       
  //             $scope.pathonhover = $scope.drawonhover
  //               .path('M160 91 L525 90')
  //               .back()
  //               .move(160,90)
  //               .stroke(hoverLinear)
  //               .stroke({ width: 3, linecap: 'round', linejoin: 'round'});
  //             $scope.drawonhover.rect(150,30).move(515,78).fill('#e74c3c').stroke('#c0392b')
  //             //Percentage on hover
  //             $scope.drawonhover.text(d._source.in_bw_used)
  //               .move(150,130)
  //               .font({ fill: ' #ff0000', size: 18, weight: 'bolder' })
  //             $scope.drawonhover.text(d._source.out_bw_used)
  //               .move(450,130)
  //               .font({ fill: ' #ff0000', size: 18, weight: 'bolder' })
  //             // Text on hover
  //             $scope.drawonhover.text(d._source.source)
  //               .move(18,85)
  //               .font({ fill: '#fff', size: 16, weight: 'bolder' })
  //               .attr('class','cursor-pointer');
  //             $scope.drawonhover.text(d._source.dest)
  //               .move(522,85)
  //               .font({ fill: '#fff', size: 16, weight: 'bolder' })
  //               .attr('class','cursor-pointer');
  //           })
  //           .mouseout(function(mout) {
  //             $("#onhover").empty();
  //           })
  //           .stroke(linear)
  //           $scope.path.stroke({ width: 1, linecap: 'round', linejoin: 'round'})
  //           $scope.path.back();
  //       }
  //     }
  //     // $scope.path.stroke(linear)
  //     // $scope.path.stroke({ width: 5, linecap: 'round', linejoin: 'round'})
  //     // $scope.path.back();
  //   });
  //   $scope.isLoading = false;
  // }
 
  // // Nodes
  // $scope.nodes = function() {
  //   $http.get('/api/mapnodes').success(function(n) {
  //     $scope.nodeHits = n.hits.hits;
  //     _.map($scope.nodeHits, function(d) {
  //       // draw rectangle
  //       $scope.draw.rect(100,20)
  //         .fill('#e74c3c')
  //         .move(d._source.x - 5,d._source.y - 13)
  //         .stroke('#c0392b')
  //         .attr('class','cursor-pointer')
  //         // anchor tag
  //         .click(function() {
  //           $window.location.href = '#/status/'+d._id;
  //         })
  //       // text inside rectangle
  //       $scope.draw.text(d._id)
  //         .move(d._source.x,d._source.y-5)
  //         .font({ fill: '#fff', size: 11 })
  //         .attr('class','cursor-pointer')
  //         .click(function() {
  //           $window.location.href = '#/status/'+d._id;
  //         });
  //     });
  //   }).error(function(e) {
  //     console.log(e);
  //   });
  // }
});