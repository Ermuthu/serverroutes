nv.addGraph(function() {
    var chart = nv.models.lineChart()
        .x(function(d){ return d.x; })
        .y(function(d){ return d.y; })
        .margin({left: 100})
        .useInteractiveGuideline(true)
        .transitionDuration(350)
        .showLegend(true) 
        .showYAxis(true)
        .showXAxis(true)
        .width(this.width)
        .height(this.height);
    
    chart.xAxis 
        .axisLabel('X')
        .tickFormat(d3.format('d'));
    
    chart.yAxis 
        .axisLabel('Y')
        .tickFormat(d3.format('f'));
    
    nv.utils.windowResize(function() {
        chart.update()
    });
    
    var svg = document.querySelector('#svg');
    d3.select(svg)
        .datum([
            {
                values: [{x:0,y:5},{x:1,y:4},{x:2,y:4.5},{x:3,y:5.5}],
                key: 'x',
                area: false
            }
        ])
        .call(chart);
});