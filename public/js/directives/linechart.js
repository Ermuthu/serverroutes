ngElastic.directive('chart', function($parse, $window){
   return{
      restrict:'EA',
      template:"<svg width='850' height='200'></svg>",
      link: function(scope, elem, attrs){
         // var lineChart = $parse(attrs.lineData);
         // console.log(lineChart(scope));
         // var lineDatas = lineChart(scope);
         // console.log(lineDatas);
         var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                 { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                 { "x": 80,  "y": 5},  { "x": 100, "y": 60}];
         console.log(lineData);
         var rawSvg=elem.find('svg');
         var svg = d3.select(rawSvg[0]);

         var lineFunction = d3.svg.line()
                              .x(function(d) { return d.x })
                              .y(function(d) { return d.y })
                              .interpolate("linear");

         var lineGraph = svg.append("path")
                           .attr("d", lineFunction(lineData))
                           .attr("stroke", "red")
                           .attr("stroke-width", 2)
                           .attr("fill", "none")
      }
   };
});