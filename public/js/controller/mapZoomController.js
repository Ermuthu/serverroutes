ngElastic.controller('mapZoomController', function($scope, $http, $routeParams, $window, $timeout, $q) {
  $scope.initMapController = function() {
    // Init Map onLoad
    var nodes = [{
      key: "krsel6-bbisp-gw1",
      location: new go.Point(50, 30),
      loc: "50 30",
    }, {
      key: "jptyo5-bbisp-gw2",
      location: new go.Point(650, 70),
      loc: "650 70",
    }, {
      key: "jptyo7-bbisp-gw2",
      location: new go.Point(700, 170),
      loc: "700 170",
    }, {
      key: "hkhkg1-bbisp-gw1",
      location: new go.Point(60, 400),
      loc: "60 400",
    }, {
      key: "hkhkg1-bbisp-gw2",
      location: new go.Point(220, 400),
      loc: "220 400",
    }, {
      key: "sgsin8-bbisp-gw1",
      location: new go.Point(250, 630),
      loc: "250 630",
    }, {
      key: "ussea4-bbisp-gw2",
      location: new go.Point(900, 70),
      loc: "900 70",
    }, {
      key: "ussea4-bb-cr1",
      location: new go.Point(1100, 140),
      loc: "1100 140",
    }, {
      key: "usprz3-bb-pe1",
      location: new go.Point(1120, 200),
      loc: "1120 200",
    }, {
      key: "usnkq1-bb-cr1",
      location: new go.Point(850, 435),
      loc: "850 435",
    }, {
      key: "usscz2-bbisp-gw2",
      location: new go.Point(1000, 625),
      loc: "1000 625",
    }, {
      key: "ussjc2-bbisp-gw2",
      location: new go.Point(1000, 750),
      loc: "1000 750",
    }, {
      key: "usmsc2-bb-pe1",
      location: new go.Point(1150, 925),
      loc: "1150 925",
    }, {
      key: "usmsc2-bb-pe2",
      location: new go.Point(1300, 925),
      loc: "1300 925",
    }, {
      key: "usmsc2-bb-cr4",
      location: new go.Point(1450, 1080),
      loc: "1450 1080",
    }, {
      key: "usrno1-bb-pe2",
      location: new go.Point(1490, 500),
      loc: "1490 500",
    }, {
      key: "usrno1-bb-cr2",
      location: new go.Point(1660, 400),
      loc: "1660 400",
    }, {
      key: "usden5-bb-cr2",
      location: new go.Point(1870, 270),
      loc: "1870 270",
    }, {
      key: "usmes1-bbisp-gw2",
      location: new go.Point(1950, 30),
      loc: "1950 30",
    }, {
      key: "usdal4-bbisp-gw2",
      location: new go.Point(1870, 790),
      loc: "1870 790",
    }, {
      key: "ushou1-bb-sw1",
      location: new go.Point(1790, 900),
      loc: "1790 900",
    }, {
      key: "ushou1-bbisp-gw1",
      location: new go.Point(1790, 970),
      loc: "1790 970",
    }, {
      key: "usnyc3-bbisp-gw2",
      location: new go.Point(2470, 175),
      loc: "2470 175",
    }, {
      key: "usewr1-bbisp-gw2",
      location: new go.Point(2670, 175),
      loc: "2670 175",
    }, {
      key: "usbos2-bb-sw2",
      location: new go.Point(2360, 70),
      loc: "2360 70",
    }, {
      key: "usxqm1-bb-cr1",
      location: new go.Point(2500, 250),
      loc: "2500 250",
    }, {
      key: "usqas3-bb-pe1",
      location: new go.Point(2500, 320),
      loc: "2500 320",
    }, {
      key: "usqas3-bb-pe2",
      location: new go.Point(2500, 370),
      loc: "2500 370",
    }, {
      key: "usuqo4-bb-cr2",
      location: new go.Point(2500, 625),
      loc: "2500 625",
    }, {
      key: "usmia1-bb-sw4",
      location: new go.Point(2350, 1040),
      loc: "2350 1040",
    }, {
      key: "gbmnc1-bb-sw2",
      location: new go.Point(3450, 130),
      loc: "3450 130",
    }, {
      key: "gbmnc1-bbisp-gw1",
      location: new go.Point(3600, 20),
      loc: "3600 20",
    }, {
      key: "uklon6-bbisp-gw2",
      location: new go.Point(2970, 110),
      loc: "2970 110",
    }, {
      key: "defra1-bbisp-gw2",
      location: new go.Point(3160, 440),
      loc: "3160 440",
    }, {
      key: "defra1-bbisp-gw1",
      location: new go.Point(3160, 510),
      loc: "3160 510",
    }, {
      key: "cntnj1-bbisp-gw1",
      location: new go.Point(50, 280),
      loc: "50 280",
    }, {
      key: "jptyo5-bbisp-gw1",
      location: new go.Point(420, 70),
      loc: "420 70",
    }, {
      key: "sgsin3-bbisp-gw1",
      location: new go.Point(250, 700),
      loc: "250 700",
    }, {
      key: "sgsin3-bbisp-gw2",
      location: new go.Point(390, 700),
      loc: "390 700",
    }, {
      key: "ausyd2-bbisp-gw1",
      location: new go.Point(450, 850),
      loc: "450 850",
    }, {
      key: "usprz2-bb-cr2",
      location: new go.Point(1500, 100),
      loc: "1500 100",
    }, {
      key: "usscz2-bb-cr2",
      location: new go.Point(850, 675),
      loc: "850 675",
    }, {
      key: "ussjc2-bbisp-gw1",
      location: new go.Point(1150, 750),
      loc: "1150 750",
    }, {
      key: "uslax1-bb-cr2",
      location: new go.Point(975, 1080),
      loc: "975 1080",
    }, {
      key: "usrno1-bb-pe1",
      location: new go.Point(1490, 450),
      loc: "1490 450",
    }, {
      key: "usden5-bbisp-gw1",
      location: new go.Point(1730, 180),
      loc: "1730 180",
    }, {
      key: "uschi6-bb-pe2",
      location: new go.Point(2135, 270),
      loc: "2135 270",
    }, {
      key: "uschi6-bb-pe3",
      location: new go.Point(2265, 270),
      loc: "2265 270",
    }, {
      key: "uslxa1-bbisp-gw1",
      location: new go.Point(1800, 430),
      loc: "1800 430",
    }, {
      key: "usdal4-bb-cr1",
      location: new go.Point(1730, 720),
      loc: "1730 720",
    }, {
      key: "usewr1-bbisp-gw1",
      location: new go.Point(2670, 80),
      loc: "2670 80",
    }, {
      key: "usbos2-bbisp-gw2",
      location: new go.Point(2650, 20),
      loc: "2650 20",
    }, {
      key: "usqas3-bb-pe3",
      location: new go.Point(2670, 320),
      loc: "2670 320",
    }, {
      key: "usqas3-bb-pe4",
      location: new go.Point(2670, 370),
      loc: "2670 370",
    }, {
      key: "usuqo4-bbisp-gw1",
      location: new go.Point(2370, 525),
      loc: "2370 525",
    }, {
      key: "usuqo4-bb-cr1",
      location: new go.Point(2500, 525),
      loc: "2500 525",
    }, {
      key: "usuqo1-bbisp-gw1",
      location: new go.Point(2260, 400),
      loc: "2260 400",
    }, {
      key: "usmia1-bbisp-gw2",
      location: new go.Point(2500, 1040),
      loc: "2500 1040",
    }, {
      key: "usmia1-bb-sw1",
      location: new go.Point(2500, 850),
      loc: "2500 850",
    }, {
      key: "sesto4-bbisp-gw2",
      location: new go.Point(3530, 170),
      loc: "3530 170",
    }, {
      key: "dkblp1-bbisp-gw2",
      location: new go.Point(3700, 240),
      loc: "3700 240",
    }, {
      key: "dedus1-bbisp-gw1",
      location: new go.Point(3700, 430),
      loc: "3700 430",
    }, {
      key: "deber3-bbisp-gw1",
      location: new go.Point(3700, 550),
      loc: "3700 550",
    }, {
      key: "inbom2-bbisp-gw1",
      location: new go.Point(3350, 700),
      loc: "3350 700",
    }, {
      key: "cntnj1-bbisp-gw2",
      location: new go.Point(50, 350),
      loc: "50 350",
    }, {
      key: "cnsha10-bbisp-gw1",
      location: new go.Point(160, 200),
      loc: "160 200",
    }, {
      key: "krsel6-bbisp-gw2",
      location: new go.Point(50, 90),
      loc: "50 90",
    }, {
      key: "jposa3-bbisp-gw2",
      location: new go.Point(240, 130),
      loc: "240 130",
    }, {
      key: "hkhkg3-bbisp-gw2",
      location: new go.Point(220, 480),
      loc: "220 480",
    }, {
      key: "ussea4-bbisp-gw1",
      location: new go.Point(900, 140),
      loc: "900 140",
    }, {
      key: "usprz3-bb-cr2",
      location: new go.Point(1240, 100),
      loc: "1240 100",
    }, {
      key: "usprz2-bb-pe2",
      location: new go.Point(1370, 200),
      loc: "1370 200",
    }, {
      key: "uslax1-bbisp-gw1",
      location: new go.Point(880, 875),
      loc: "880 875",
    }, {
      key: "usmsc2-bb-pe3",
      location: new go.Point(1300, 1025),
      loc: "1300 1025",
    }, {
      key: "usmsc2-bb-cr1",
      location: new go.Point(1000, 1080),
      loc: "1000 1080",
    }, {
      key: "usmsc2-bb-cr2",
      location: new go.Point(1150, 1080),
      loc: "1150 1080",
    }, {
      key: "usmsc2-bb-cr3",
      location: new go.Point(1300, 1080),
      loc: "1300 1080",
    }, {
      key: "usrno3-bb-cr1",
      location: new go.Point(1380, 240),
      loc: "1380 240",
    }, {
      key: "usrno3-bb-cr2",
      location: new go.Point(1380, 290),
      loc: "1380 290",
    }, {
      key: "usden5-bbisp-gw2",
      location: new go.Point(1870, 180),
      loc: "1870 180",
    }, {
      key: "usden5-bb-cr1",
      location: new go.Point(1730, 270),
      loc: "1730 270",
    }, {
      key: "uschi5-bb-cr1",
      location: new go.Point(2110, 190),
      loc: "2110 190",
    }, {
      key: "uschi5-bb-cr2",
      location: new go.Point(2260, 190),
      loc: "2260 190",
    }, {
      key: "uslxa1-bbisp-gw2",
      location: new go.Point(1800, 500),
      loc: "1800 500",
    }, {
      key: "usatl4-bb-cr2",
      location: new go.Point(2060, 1100),
      loc: "2060 1100",
    }, {
      key: "usatl4-bbisp-gw1",
      location: new go.Point(1920, 1160),
      loc: "1920 1160",
    }, {
      key: "usbos2-bb-sw1",
      location: new go.Point(2360, 20),
      loc: "2360 20",
    }, {
      key: "usxqm1-bb-cr2",
      location: new go.Point(2620, 250),
      loc: "2620 250",
    }, {
      key: "usqas2-bbisp-gw1",
      location: new go.Point(2380, 320),
      loc: "2380 320",
    }, {
      key: "usuqo4-bbisp-gw2",
      location: new go.Point(2370, 625),
      loc: "2370 625",
    }, {
      key: "usmia1-bb-sw2",
      location: new go.Point(2395, 850),
      loc: "2395 850",
    }, {
      key: "usmia1-bb-sw3",
      location: new go.Point(2350, 950),
      loc: "2350 950",
    }, {
      key: "gbmnc1-bb-sw1",
      location: new go.Point(3450, 20),
      loc: "3450 20",
    }, {
      key: "gbmnc1-bbisp-gw2",
      location: new go.Point(3600, 90),
      loc: "3600 90",
    }, {
      key: "uklon5-bbisp-gw2",
      location: new go.Point(3120, 155),
      loc: "3120 155",
    }, {
      key: "ieork1-bbisp-gw1",
      location: new go.Point(3300, 50),
      loc: "3300 50",
    }, {
      key: "nlams2-bbisp-gw2",
      location: new go.Point(3460, 250),
      loc: "3460 250",
    }, {
      key: "nlams2-bbisp-gw1",
      location: new go.Point(3460, 320),
      loc: "3460 320",
    }, {
      key: "frcch1-bbisp-gw1",
      location: new go.Point(3160, 315),
      loc: "3160 315",
    }, {
      key: "sesto4-bbisp-gw1",
      location: new go.Point(3700, 170),
      loc: "3700 170",
    }, {
      key: "dkblp1-bbisp-gw1",
      location: new go.Point(3700, 310),
      loc: "3700 310",
    }, {
      key: "inmaa1-bbisp-gw1",
      location: new go.Point(3200, 700),
      loc: "3200 700",
    }, {
      key: "inmaa1-bbisp-gw2",
      location: new go.Point(3200, 800),
      loc: "3200 800",
    }, {
      key: "usprz2-bb-pe1",
      location: new go.Point(1370, 150),
      loc: "1370 150",
    }, {
      key: "usnkq1-bb-cr2",
      location: new go.Point(850, 535),
      loc: "850 535",
    }, {
      key: "usscz2-bbisp-gw1",
      location: new go.Point(1000, 525),
      loc: "1000 525",
    }, {
      key: "uslax1-bb-cr1",
      location: new go.Point(825, 1080),
      loc: "825 1080",
    }, {
      key: "usmsc2-bb-pe4",
      location: new go.Point(1150, 1025),
      loc: "1150 1025",
    }, {
      key: "usrno3-bb-pe1",
      location: new go.Point(1250, 350),
      loc: "1250 350",
    }, {
      key: "usrno3-bb-pe2",
      location: new go.Point(1250, 400),
      loc: "1250 400",
    }, {
      key: "uschi5-bbisp-gw2",
      location: new go.Point(2110, 110),
      loc: "2110 110",
    }, {
      key: "uschi6-bb-pe4",
      location: new go.Point(2335, 270),
      loc: "2335 270",
    }, {
      key: "usdal4-bbisp-gw1",
      location: new go.Point(1730, 790),
      loc: "1730 790",
    }, {
      key: "ushou1-bbisp-gw2",
      location: new go.Point(1790, 1040),
      loc: "1790 1040",
    }, {
      key: "usnyc3-bbisp-gw1",
      location: new go.Point(2470, 80),
      loc: "2470 80",
    }, {
      key: "usbos2-bbisp-gw1",
      location: new go.Point(2500, 20),
      loc: "2500 20",
    }, {
      key: "usqas2-bbisp-gw2",
      location: new go.Point(2380, 370),
      loc: "2380 370",
    }, {
      key: "usuqo1-bbisp-gw2",
      location: new go.Point(2260, 475),
      loc: "2260 475",
    }, {
      key: "uklon5-bbisp-gw1",
      location: new go.Point(3120, 65),
      loc: "3120 65",
    }, {
      key: "defra3-bbisp-gw2",
      location: new go.Point(3330, 440),
      loc: "3330 440",
    }, {
      key: "defra3-bbisp-gw1",
      location: new go.Point(3330, 510),
      loc: "3330 510",
    }, {
      key: "frcch1-bbisp-gw2",
      location: new go.Point(3160, 375),
      loc: "3160 375",
    }, {
      key: "dedus1-bbisp-gw2",
      location: new go.Point(3700, 360),
      loc: "3700 360",
    }, {
      key: "cnsha10-bbisp-gw2",
      location: new go.Point(160, 260),
      loc: "160 260",
    }, {
      key: "jposa3-bbisp-gw1",
      location: new go.Point(240, 60),
      loc: "240 60",
    }, {
      key: "jptyo7-bbisp-gw1",
      location: new go.Point(420, 170),
      loc: "420 170",
    }, {
      key: "hkhkg3-bbisp-gw1",
      location: new go.Point(60, 480),
      loc: "60 480",
    }, {
      key: "sgsin8-bbisp-gw2",
      location: new go.Point(390, 630),
      loc: "390 630",
    }, {
      key: "ausyd2-bbisp-gw2",
      location: new go.Point(600, 850),
      loc: "600 850",
    }, {
      key: "ussea4-bb-cr2",
      location: new go.Point(1100, 70),
      loc: "1100 70",
    }, {
      key: "usprz3-bb-pe2",
      location: new go.Point(1120, 250),
      loc: "1120 250",
    }, {
      key: "usprz3-bb-cr1",
      location: new go.Point(1240, 50),
      loc: "1240 50",
    }, {
      key: "usprz2-bb-cr1",
      location: new go.Point(1500, 50),
      loc: "1500 50",
    }, {
      key: "usscz2-bb-cr1",
      location: new go.Point(850, 575),
      loc: "850 575",
    }, {
      key: "uslax1-bbisp-gw2",
      location: new go.Point(880, 950),
      loc: "880 950",
    }, {
      key: "usrno1-bb-cr1",
      location: new go.Point(1660, 350),
      loc: "1660 350",
    }, {
      key: "usmes1-bbisp-gw1",
      location: new go.Point(1800, 30),
      loc: "1800 30",
    }, {
      key: "uschi5-bbisp-gw1",
      location: new go.Point(2260, 110),
      loc: "2260 110",
    }, {
      key: "uschi6-bb-pe1",
      location: new go.Point(2035, 270),
      loc: "2035 270",
    }, {
      key: "usdal4-bb-cr2",
      location: new go.Point(1870, 720),
      loc: "1870 720",
    }, {
      key: "usatl4-bb-cr1",
      location: new go.Point(1920, 1100),
      loc: "1920 1100",
    }, {
      key: "usatl4-bbisp-gw2",
      location: new go.Point(2060, 1160),
      loc: "2060 1160",
    }, {
      key: "ushou1-bb-sw2",
      location: new go.Point(1790, 1100),
      loc: "1790 1100",
    }, {
      key: "usuqo1-bb-cr1",
      location: new go.Point(2370, 400),
      loc: "2370 400",
    }, {
      key: "usuqo1-bb-cr2",
      location: new go.Point(2370, 475),
      loc: "2370 475",
    }, {
      key: "usmia1-bbisp-gw1",
      location: new go.Point(2500, 950),
      loc: "2500 950",
    }, {
      key: "uklon6-bbisp-gw1",
      location: new go.Point(2970, 20),
      loc: "2970 20",
    }, {
      key: "ieork1-bbisp-gw2",
      location: new go.Point(3300, 110),
      loc: "3300 110",
    }, {
      key: "deber3-bbisp-gw2",
      location: new go.Point(3700, 480),
      loc: "3700 480",
    }, {
      key: "inbom2-bbisp-gw2",
      location: new go.Point(3350, 800),
      loc: "3350 800",
    }];

    if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make; // for conciseness in defining templates

    // Dynamic color function
    function linkLinearBrush(link) {
      var b = new go.Brush(go.Brush.Linear);
      var fp = link.fromPort.getDocumentPoint(go.Spot.Center);
      var tp = link.toPort.getDocumentPoint(go.Spot.Center);
      var right = (tp.x > fp.x);
      var down = (tp.y > fp.y);
      if (right) {
        if (down) {
          b.start = go.Spot.TopLeft;
          b.end = go.Spot.BottomRight;
        } else {
          b.start = go.Spot.BottomLeft;
          b.end = go.Spot.TopRight;
        }
      } else { // leftward
        if (down) {
          b.start = go.Spot.TopRight;
          b.end = go.Spot.BottomLeft;
        } else {
          b.start = go.Spot.BottomRight;
          b.end = go.Spot.TopLeft;
        }
      }
      b.addColorStop(0.4999, link.data.inColor);
      b.addColorStop(0.5000, link.data.outColor);
      return b;
    }

    myDiagram = $(go.Diagram, "myDiagramDiv", // create a Diagram for the DIV HTML element
      {
        initialContentAlignment: go.Spot.Center, // center the content
        commandHandler: $(SpacingCommandHandler),
        // update the SpacingCommandHandler.space from the model at the end of each transaction
        "ModelChanged": function(e) {
          if (e.isTransactionFinished) {
            myDiagram.commandHandler.space = myDiagram.model.modelData.space;
          }
        },
        "undoManager.isEnabled": true // enable undo & redo
      });

    // Define a simple Node template that cannot be shared with other Diagrams,
    // because of the use of the Node.location Binding conversion functions.
    // The SpacingCommandHandler also assumes the Node.location is bound to the data property named "loc".
    myDiagram.nodeTemplate =
      $(go.Node, "Auto", {
          width: 120,
          height: 25
        },
        new go.Binding("location", "loc", spacedLocationParse).makeTwoWay(spacedLocationStringify),
        $(go.Shape, "RoundedRectangle", {
          fill: "#e74c3c",
          stroke: '#c0392b'
        }),
        $(go.TextBlock, {
            margin: 0,
            stroke: "#EEE"
          }, // some room around the text
          // TextBlock.text is bound to Node.data.key
          new go.Binding("text", "key"))
      );

    myDiagram.linkTemplate =
      $(go.Link, {
          //   routing: go.Link.AvoidsNodes,
          //   reshapable: true,
          //   resegmentable: true
        },
        $(go.Shape, {
            strokeWidth: 1
          },
          new go.Binding("stroke", "", linkLinearBrush).ofObject() // Dynamic Two color lines
        ),
        $(go.Shape, {
          toArrow: "Standard",
          stroke: null,
          strokeWidth: 0
        })
      );

    var links = [];
    $q.all([$http.get('/api/maplinks'),
        $http.get('/api/maplinksdyncolor')
      ])
      .then(function(res) {
        $scope.mapLinks = _.uniqWith(res[0].data.hits.hits, $scope.predicateAndModifier);
        $scope.maplinksdyncolor = _.uniqWith(res[1].data.hits.hits, $scope.predicateAndModifier);
        var linksObj = _.unionWith($scope.mapLinks, $scope.maplinksdyncolor, $scope.predict);
        _.map(linksObj, function(obj) {
          links.push({
            from: obj._source.source,
            to: obj._source.dest,
            inColor: $scope.getColor(obj._source.in_bw_used),
            outColor: $scope.getColor(obj._source.out_bw_used),
          });
        });
        myDiagram.model = new go.GraphLinksModel(
          nodes,
          links
        );
        // $scope.model.selectedNodeData = null;
      });


    // the "space" property is kept on the Model.modelData too
    myDiagram.model.modelData.space = 1.0;
  }

  // Conversion functions -- these only work with myDiagram, assuming it uses a SpacingCommandHandler

  function spacedLocationParse(str) {
    var cmd = myDiagram.commandHandler;
    if (!(cmd instanceof SpacingCommandHandler)) throw new Error("not using SpacingCommandHandler");
    var pt = go.Point.parse(str);
    pt.x = (pt.x - cmd.spaceCenter.x) * cmd.space + cmd.spaceCenter.x;
    if (cmd.isYSpaced) {
      pt.y = (pt.y - cmd.spaceCenter.y) * cmd.space + cmd.spaceCenter.y;
    }
    return pt;
  }

  function spacedLocationStringify(pt, data) {
    var cmd = myDiagram.commandHandler;
    if (!cmd._isUpdating) {
      pt = pt.copy();
      pt.x = (pt.x - cmd.spaceCenter.x) / cmd.space + cmd.spaceCenter.x;
      if (cmd.isYSpaced) {
        pt.y = (pt.y - cmd.spaceCenter.y) / cmd.space + cmd.spaceCenter.y;
      }
      return go.Point.stringify(pt);
    } else {
      return data.loc;
    }
  }


  // The custom CommandHandler that avoids changing the Diagram.scale
  function SpacingCommandHandler() {
    go.CommandHandler.call(this);
    this._space = 1.0; // replaces Diagram.scale; also copied to/from Model.modelData.space
    this._spaceCenter = new go.Point(0, 0); // not currently used -- should this be saved on modelData too?
    this._isYSpaced = true; // scale Y along with X?  This option is just for demonstration purposes.
    this._isUpdating = false;
  }
  go.Diagram.inherit(SpacingCommandHandler, go.CommandHandler);

  // Overrides of commands that scale the diagram -- change the space instead

  /** @override */
  SpacingCommandHandler.prototype.decreaseZoom = function(factor) {
    if (factor === undefined /*notpresent*/ ) factor = 1.0 / this.zoomFactor;
    this.setSpace(this.space * factor);
  };
  /** @override */
  SpacingCommandHandler.prototype.canDecreaseZoom = function(factor) {
    if (factor === undefined /*notpresent*/ ) factor = 1.0 / this.zoomFactor;
    return this.checkSpace(this.space * factor);
  };

  /** @override */
  SpacingCommandHandler.prototype.increaseZoom = function(factor) {
    if (factor === undefined /*notpresent*/ ) factor = 1.0 / this.zoomFactor;
    this.setSpace(this.space / factor);
  };
  /** @override */
  SpacingCommandHandler.prototype.canIncreaseZoom = function(factor) {
    if (factor === undefined /*notpresent*/ ) factor = 1.0 / this.zoomFactor;
    return this.checkSpace(this.space / factor);
  };

  /** @override */
  SpacingCommandHandler.prototype.resetZoom = function(newspace) {
    if (newspace === undefined /*notpresent*/ ) newspace = 1.0;
    this.setSpace(newspace);
  };
  /** @override */
  SpacingCommandHandler.prototype.canResetZoom = function(newspace) {
    return this.checkSpace(newspace);
  };

  // actually set a new value for SPACE
  SpacingCommandHandler.prototype.setSpace = function(s) {
    this.space = Math.max(0.1, Math.min(10.0, s));
  };

  // validity check for a new value for SPACE
  SpacingCommandHandler.prototype.checkSpace = function(s) {
    return 0.1 <= s && s <= 10.0;
  };


  // Properties for SpacingCommandHandler

  Object.defineProperty(SpacingCommandHandler.prototype, "space", {
    get: function() {
      return this._space;
    },
    set: function(val) {
      if (val != undefined) {
        if (val !== this._space) {
          this._space = val;
          var diagram = this.diagram;
          if (diagram !== null) { // store in model too, and support undo
            diagram.model.setDataProperty(diagram.model.modelData, "space", val);
          }
          this.updateAllLocations();
          // update the page showing the current value
          // console.log(document.getElementById("SPACE"));
          document.getElementById("SPACE").textContent = val.toString();
        }
      }
    }
  });

  Object.defineProperty(SpacingCommandHandler.prototype, "spaceCenter", {
    get: function() {
      return this._spaceCenter;
    },
    set: function(val) {
      if (!val.equals(this._spaceCenter)) {
        this._spaceCenter = val.copy();
      }
    }
  });

  Object.defineProperty(SpacingCommandHandler.prototype, "isYSpaced", {
    get: function() {
      return this._isYSpaced;
    },
    set: function(val) {
      if (val !== this._isYSpaced) {
        this._isYSpaced = val;
        this.updateAllLocations();
      }
    }
  });

  // If the spacing or isYSpaced properties change value,
  // we need to update the effective locations of all nodes.
  // Assume Node.location is data bound to "loc" property.
  SpacingCommandHandler.prototype.updateAllLocations = function() {
    var diagram = this.diagram;
    if (diagram === null) return;
    this._isUpdating = true;
    diagram.skipsUndoManager = true;
    diagram.startTransaction("respace nodes");
    diagram.parts.each(function(p) {
      p.updateTargetBindings("loc");
    });
    diagram.nodes.each(function(n) {
      n.updateTargetBindings("loc");
    });
    diagram.commitTransaction("respace nodes");
    diagram.skipsUndoManager = false;
    this._isUpdating = false;
  };
  // end SpacingCommandHandler class


  function onIsYSpacedToggled() {
    myDiagram.commandHandler.isYSpaced = !myDiagram.commandHandler.isYSpaced;
  }

  $scope.getColor = function(bw) {
    if (bw > 0 && bw < 11)
      return "#4D72E3";
    else if (bw > 10 && bw < 21)
      return "#48CCCD";
    else if (bw > 20 && bw < 31)
      return "#00FF00";
    else if (bw > 30 && bw < 41)
      return "#B1FB17";
    else if (bw > 40 && bw < 51)
      return "#FFFF00";
    else if (bw > 50 && bw < 61)
      return "#FDD017";
    else if (bw > 60 && bw < 71)
      return "#FBB117";
    else if (bw > 70 && bw < 81)
      return "#F87217";
    else if (bw > 80 && bw < 91)
      return "#FF0000";
    else if (bw > 90 && bw < 101)
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
    return a._source.source === b._source.dest && a._source.dest === b._source.source;
    // return a._source.dest === b._source.dest && a._source.src === b._source.src && a._source.src_x === b._source.src_x && a._source.src_y === b._source.src_y && a._source.dst_x === b._source.dst_x && a._source.dst_y === b._source.dst_y && $scope.modifyObjs(a, b);
  }

  $scope.predict = function(a, b) {
    return a._source.dest === b._source.dest && a._source.source === b._source.source && $scope.modifyObjs(a, b);
  }
});