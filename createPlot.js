function createBar(bars, map) {
    y.domain([0, d3.max(bars, function(g) { return g.val })])
    x = d3.scaleBand()
          .range([widthShift, width*0.96])
          .padding(0.1)
          .domain(bars.map((b) => b.name));
    d3.select("#xax").call(d3.axisBottom(x))
            .selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)" 
                });;
    d3.select("#yax").call(d3.axisLeft(y));
    d3.select("#xLabel").text("");

    for (var i = 0; i < bars.length; i++) {
        let game = bars[i].name;
        ctrSvg.append('rect')
            .attr("id", game)
            .style('fill', getFill(gameData.get(game).Category))
            .attr('x', x(game))
            .attr('y', heightShift)
            .attr('width', x.bandwidth())
            .on("mouseenter", function() {
                d3.select("#gameName").text(d3.select(this).attr("id"));
                populateSlotBar(gameData.get(d3.select(this).attr("id")));
            });
    }
    ctrSvg.selectAll('rect')
      .transition()
      .attr('y', function() {
            var game = d3.select(this).attr("id");
            var elem = bars.find(function(element) { return game == element.name });
            return y(elem.val);
        })
      .attr('height', function() { 
            var game = d3.select(this).attr("id");
            var elem = bars.find(function(element) { return game == element.name });
            return (heightShift) -  y(elem.val); 
        })
      .duration(1000);

}

function createScatter(pts, map) {
    x = d3.scaleLinear()
    .domain([0, d3.max(pts, function(p) { return parseFloat(map.get(p.name).fTotal) / parseFloat(map.get(p.name).fActive) })])
    .range([ widthShift, width * 0.96]);
    
    y = d3.scaleLinear()
    .range([ heightShift, height * 0.02])
    .domain([0, 100]);

    d3.select("#xax").call(d3.axisBottom(x));
    d3.select("#yax").call(d3.axisLeft(y));
    d3.select("#xLabel").text(fgText);
    d3.select("#yLabel").text(wlText);


    for (var i = 0; i < pts.length; i++) {
        let game = pts[i].name;
        ctrSvg.append("circle")
            .attr("cx", function() { return x(parseFloat(gameData.get(game).fTotal) / parseFloat(gameData.get(game).fActive)); })
            .attr("cy", function() { return heightShift; })
            .attr("id", game)
            .attr("r", height * width / 75000)
            .style("fill", getFill(map.get(game).Category))
            .on("mouseenter", function() {
                d3.select("#gameName").text(d3.select(this).attr("id"));
                populateSlotBar(gameData.get(d3.select(this).attr("id")));
            });
    }
    d3.selectAll('circle')
      .transition()
      .attr('cy', function() {
            var game = d3.select(this).attr("id");
            return y(parseFloat(map.get(game).wPct) * 100);
        })
      .duration(1000);
}

function createBarCat(bars, map) {
    y.domain([0, d3.max(bars, function(g) { return g.val })])
    x = d3.scaleBand()
          .range([widthShift, width*0.96])
          .padding(0.1)
          .domain(bars.map((b) => b.name));
    d3.select("#xax").call(d3.axisBottom(x))
            .selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)" 
                });
    d3.select("#yax").call(d3.axisLeft(y));
    d3.select("#xLabel").text("");

    for (var i = 0; i < bars.length; i++) {
        let cat = bars[i].name;
        ctrSvg.append('rect')
            .attr("id", cat)
            .style('fill', categoryData.get(cat).color)
            .attr('x', x(cat))
            .attr('y', heightShift)
            .attr('width', x.bandwidth());
    }
    ctrSvg.selectAll('rect')
      .transition()
      .attr('y', function() {
            var cat = d3.select(this).attr("id");
            var elem = bars.find(function(element) { return cat == element.name });
            return y(elem.val);
        })
      .attr('height', function() { 
            var cat = d3.select(this).attr("id");
            var elem = bars.find(function(element) { return cat == element.name });
            return (heightShift) -  y(elem.val); 
        })
      .duration(1000);

}

function createScatterCat(pts, map) {
    x = d3.scaleLinear()
    .domain([0, d3.max(pts, function(p) { return p.freq })])
    .range([ width * 0.06, width * 0.96]);
    
    y = d3.scaleLinear()
    .range([ heightShift, height * 0.02])
    .domain([0, 100]);

    d3.select("#xax").call(d3.axisBottom(x));
    d3.select("#yax").call(d3.axisLeft(y));
    d3.select("#xLabel").text(fcText);
    d3.select("#yLabel").text(wlText);

    for (var i = 0; i < pts.length; i++) {
        let cat = pts[i];
        ctrSvg.append("circle")
            .attr("cx", function() { return x(cat.freq); })
            .attr("cy", function() { return heightShift; })
            .attr("id", cat.name)
            .attr("r", height * width / 75000)
            .style("fill", map.get(cat.name).color);
    }
    d3.selectAll('circle')
      .transition()
      .attr('cy', function() {
            var cat = d3.select(this).attr("id");
            return y(pts.find(function(element) { return cat == element.name }).pct);
        })
      .duration(1000);
}