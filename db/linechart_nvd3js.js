
    function DrawGraph(seriesData, container, XLabel, YLabel) {   // this graph need to change with line chart.
      var jsonData = seriesData.map(function(d) {
        var tmpData = {}; // convert the data into format that's compatible with nv.d3
        tmpData.key = d.key;
        tmpData.values = []; // changes values from [ {x,y}, {x,y}, {x,y} ] to [ [x,y], [x,y], [x,y] ]
        for (var i = 0; i < d.values.length; i++) { 
          var arr = [];
          arr.push(d.values[i].x);
          arr.push(d.values[i].y);
          tmpData.values.push(arr);
        }
        return tmpData; 
      });
      internalGraph(jsonData, container, XLabel, YLabel);
    }       

    // internalDrawGraph
    function internalGraph(jsonData, container, XLabel, YLabel) {   // this graph need to change with line chart.
       // var colors = d3.scale.category10();   4682B4    42f45f
      var colorScale = d3.scale.linear()
         .range(["#8000ff","#ff9999"]); 
      // console.log(jsonData);
      var chart2;
      nv.addGraph(function() {
        chart2 = nv.models.lineChart()
          .margin({top: 10, bottom: 100, left: 50, right: 80})
          .x(function(d) { return d[0] })
          .y(function(d) { return d[1] }) // adjusting, 100% is 1.00, not 100 as it is in the data
          // .color(d3.scale.category10().range())
          // .color(d3.scale.category10().range())
          // .transition()
          // .duration(20000)
            // .x(function(d) { return d[0] })
          .color(colorScale.range())
          .rightAlignYAxis(true)
          .interpolate("step-after")
          // .showLegend(false)   // hide legend button of nv d3 js
          .useInteractiveGuideline(false);
        chart2.xScale(d3.time.scale());
        setChartOptions(chart2, container);
        chart2.xAxis.axisLabel(XLabel)
          .rotateLabels(30)
          .axisLabelDistance(100)
          // .noData("There is no data avilable for " + container.toUpperCase() + " graph")
         
          .staggerLabels(true); 
        chart2.yAxis.axisLabel(YLabel);
        d3.select('#' + container)
          .append('svg')
          .datum(jsonData)
          // .transition().duration(20000)
          .call(chart2);

        if (gdata.length>0) {
            var drag = addDragFeature(chart, container, XLabel, YLabel);
            d3.select('#' + container).call(drag);
        }  


        // d3.select("svg.nvd3 .nv-wrap .nv-stackedAreaChart")
        d3.select("svg.nvd3 .nv-wrap .nv-lineChart")
          .attr("transform","translate(40,30)");
         nv.utils.windowResize(chart2.update);
        return chart2;
      }); 
    }




function setChartOptions(chart, container) {
    
    var domain = chart.yAxis.scale().domain();
    chart.useVoronoi(false);
  
    switch(container) {
        case "Bandwidth":

  
            chart.xAxis
                .tickFormat(function(d){return d3.time.format('%d/%b %H:%M')(new Date(d * 1000));});
            chart.yAxis

                .tickFormat(function(d) {
                    if (d === null) {
                        return 'N/A';
                    }
                    return d3.format('.08f')(d);
                });
            break;
        case "Packets":
            chart.xAxis
                .tickFormat(function(d){return d3.time.format('%d/%b %H:%M')(new Date(d * 1000));});
            chart.yAxis
                .tickFormat(function(d) {
                    if (d === null) {
                        return 'N/A';
                    }
                    return d3.format('.08f')(d);
                });
            break;
        case "Drop":
            chart.forceY([0, domain[1]]);
            chart.xAxis
                .tickFormat(function(d){ return d3.time.format('%d/%b %H:%M')(new Date(d * 1000));});
            chart.yAxis
                .tickFormat(function(d) { if (d === null) {
                        return 'N/A';
                    }
                    return d + "%"; });
            break;
        case "CRC":
            chart.forceY([0, domain[1]]);
            chart.xAxis
                .tickFormat(function(d) { return d3.time.format('%H:%M:%S')(new Date(d * 1000));});
            chart.yAxis.ticks(1);
            //chart.yAxis.tickFormat(d3.format(',f'));
            break;
        case "COL":
            chart.forceY([0, domain[1]]);
            chart.xAxis
                .tickFormat(function(d) { return d3.time.format('%H:%M:%S')(new Date(d * 1000));});
            chart.yAxis.ticks(1);
            //chart.yAxis.tickFormat(d3.format(',f'));
            break;
        case "Failure":
            chart.forceY([0, domain[1]]);
            chart.xAxis
                .tickFormat(function(d) { return d3.time.format('%H:%M:%S')(new Date(d * 1000));});
            chart.yAxis.ticks(1);
            //chart.yAxis.tickFormat(function(d) {  return (d === 0)?"Down":"Up"; });
            //chart.yAxis.tickFormat(d3.format(',f'));
            break;
        case "Path":
            chart.forceY([0, domain[1]]);
            chart.xAxis
                .tickFormat(function(d) { return d3.time.format('%d/%b %H:%M:%S')(new Date(d * 1000));});
            chart.yAxis.ticks(1);
            //chart.yAxis.tickFormat(d3.format('d'));
            
            //chart.yAxis.tickFormat(function(d) {  return (d === 0)?"Down":"Up"; });
            break;
        default:
    }
}

//function for drag

function addDragFeature(chart, container, XLabel, YLabel) {
    var drag = d3.behavior.drag() 
        .on('drag', function () {
            if (!this.arrData) {
                this.arrData = [d3.event.x, d3.event.x];
            } else {
                this.arrData[1] = d3.event.x;
            }

            var canvas = d3.select(this);

            canvas.selectAll('.selection').remove();
            canvas.append('rect')
                .attr('class', 'selection')
                .attr('fill', 'steelblue')
                .attr('opacity', '.3')
                .attr('x', d3.min(this.arrData))
                .attr('y', 30)
                .attr('width', Math.abs(this.arrData[1] - this.arrData[0]))
                .attr('height', canvas.select('.nv-wrap rect').attr('height'));
        })
        .on('dragend', function (d) {
            var dt = this.arrData;
            if (this.arrData) {
                var min = chart.xAxis.scale().invert(d3.min(this.arrData));
                var max = chart.xAxis.scale().invert(d3.max(this.arrData));
    
                d.forEach(function (item, index) {
                    item.values = item.values.filter(function (item, index) {
                        return (item.x >= min && item.x <= max);
                    });
                });
    
                delete this.arrData;
    
                d3.select(this).selectAll('.selection').remove();
    
                DrawBWGraph(d, container, XLabel, YLabel);
            }
        });
    return drag;
}

