/* The Price is Right Visualization
 * Comp177 Final Project
 * Completed May 1 2020
 * Created by Ben Santaus
 * 
 * createPlot.js
 * Contains four functions that create different kinds of plots 
 * for the central SVG of the page.
*/


//Sadly all these functions are essentially the same but I didn't have 
//time to figure out how to effectively modularize them

//Anyway here's some functional garbage.
function createBar(bars, map) {

    //Reset the x and y axes to fit the kind of chart we have and the data in it
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

    //no need for axis label, there are already labels ^ for each bar
    d3.select("#xLabel").text("");

    for (var i = 0; i < bars.length; i++) {
        let game = bars[i].name;
        ctrSvg.append('rect')
            .attr("id", game)
            .style('fill', function() { console.log(game); return getFill(gameData.get(game).Category) } )
            .attr('x', x(game))
            .attr('y', heightShift)
            .attr('width', x.bandwidth())
            .style("opacity", function() {

                //So I actually like this feature quite a lot and it made the viz a whole lot more usable
                //This is how the plot is able to the clicked one bar/circle highlighted if the plot changes
                //Although if the clicked bar/circle is no longer in the viz as a result it resets.
                if (!clicked || (bars.map(b => b.name).includes(clicked) && game == clicked)) {
                    return 1;
                } else {
                    return .5;
                }
            })
            .on("mouseenter", function() {
                if (!clicked) editMeta(game);
            })
            .on("click", function() {
                if (clicked != game) { //Again this should have been made its own function but I didn't have time/motivation
                    d3.selectAll("rect")
                        .transition()
                        .style("opacity", function() { return (d3.select(this).attr("id") == game ? 1 : .5)})
                        .duration(100);
                    clicked = game;
                    editMeta(game);
                } else {
                    d3.selectAll("rect")
                        .transition()
                        .style("opacity", 1)
                        .duration(100);
                    clicked = undefined;
                    editMeta(game);
                }
            });
    }

    //pretty transitions.
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


//Lots of the same in this one. Just with circles instead of rectangles.
function createScatter(pts, map) {

    //reset axes
    x = d3.scaleLinear()
    .domain([0, d3.max(pts, function(p) { return parseFloat(map.get(p.name).fTotal) / parseFloat(map.get(p.name).fActive) })])
    .range([ widthShift, width * 0.96]);
    
    y = d3.scaleLinear()
    .range([ heightShift, height * 0.02])
    .domain([0, 100]);

    d3.select("#xax").call(d3.axisBottom(x));
    d3.select("#yax").call(d3.axisLeft(y));
    d3.select("#xLabel").text(fgText); //we need an x axis label this time.
    d3.select("#yLabel").text(wlText);


    for (var i = 0; i < pts.length; i++) {
        let game = pts[i].name;
        ctrSvg.append("circle")
            .attr("cx", function() { return x(parseFloat(gameData.get(game).fTotal) / parseFloat(gameData.get(game).fActive)); })
            .attr("cy", function() { return heightShift; })
            .attr("id", game)
            .attr("r", height * width / 75000)
            .style("fill", getFill(map.get(game).Category))
            .style("opacity", function() {
                if (!clicked || (pts.map(b => b.name).includes(clicked) && game == clicked)) {
                    return 1;
                } else {
                    return .5;
                }
            })
            .on("mouseenter", function() {
                if (!clicked) editMeta(game);
            })
            .on("click", function() { //see I told you this was all the same just with circles.
                if (clicked != game) {
                    d3.selectAll("circle")
                        .transition()
                        .style("opacity", function() { return (d3.select(this).attr("id") == game ? 1 : .5)})
                        .duration(100);
                    clicked = game;
                    editMeta(game);
                } else {
                    d3.selectAll("circle")
                        .transition()
                        .style("opacity", 1)
                        .duration(100);
                    clicked = undefined;
                    editMeta(game);
                }
            });
    }

    //different pretty transition
    d3.selectAll('circle')
      .transition()
      .attr('cy', function() {
            var game = d3.select(this).attr("id");
            return y(parseFloat(map.get(game).wPct) * 100);
        })
      .duration(1000);
}


//Ok so this one is for bars again but it's when the grouped by category option is selected
//And that's a great feature that I liked and it was totally a pain in the /sldvkbnsd
//to get it working so instead I just repeated code.
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
            .style('fill', categoryData.get(cat).color) //you'll notice this one is a lot shorter
            .attr('x', x(cat))                          //That's because there's no metadata I can display for these things
            .attr('y', heightShift)                     //So it's insightful and kinda less interesting at the same time which is annoying.
            .attr('width', x.bandwidth());
    }
    ctrSvg.selectAll('rect') //still got pretty transitions though.
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

//Same deal as above except with circles.
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