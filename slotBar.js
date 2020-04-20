function populateSlotBar(gd) {
    d3.select("#metaApp").text("First Appearance: Season " + findFirstApp(gd));
    d3.select("#metaCat").text("Categories: " + (gd.Category.split(',')[0] ? categoryData.get(gd.Category.split(',')[0]).niceText : "") + (gd.Category.split(',')[1] ? ", " + categoryData.get(gd.Category.split(',')[1]).niceText : ""));
    d3.select("#metaTotal").text("Total Appearances: " + gd.fTotal);
    d3.select("#metaFrank").text("Total Appearances Rank: " + gd.fRank);
    d3.select("#metaActive").text("Seasons Active: " + gd.fActive);
    d3.select("#metaWPct").text("Overall Win %: " + (gd.wPct ? (gd.wPct * 100).toFixed(2) + "%": "unavailable"));

    if (!gd.s1) { clearSlotBar(); return; }

    slots = [gd.s1, gd.s2, gd.s3, gd.s4, gd.s5, gd.s6, gd.sNA];
    sx.domain([0, d3.max(slots, function(s) { return parseInt(s); })]);
    let grad = getFillSlot(gd.Category);
    
    for (var i = 1; i < 8; i++) {
        d3.select("#slot" + i.toString() )
        .transition()
        .attr('width', function() { 
            return sx(parseInt(slots[i-1])); 
        })
        .style("fill", grad)
        .duration(200);
    }
}

function findFirstApp(gd) {
    var seasons = [gd.f1, gd.f2, gd.f3, gd.f4, gd.f5, gd.f6, gd.f7, gd.f8, gd.f9, gd.f10, 
                    gd.f11, gd.f12, gd.f13, gd.f14, gd.f15, gd.f16, gd.f17, gd.f18, gd.f19, gd.f20, 
                    gd.f21, gd.f22, gd.f23, gd.f24, gd.f25, gd.f26, gd.f27, gd.f28, gd.f29, gd.f30,
                    gd.f31, gd.f32, gd.f33, gd.f34, gd.f35, gd.f36, gd.f37, gd.f38, gd.f39, gd.f40, 
                    gd.f41, gd.f42, gd.f43, gd.f44, gd.f45, gd.f46, gd.f47];
    for (var i = 0; i < seasons.length; i++) {
        if (seasons[i] != '-') return (i + 1);
    }
}

function clearSlotBar() {
    for (var i = 1; i < 8; i++) {
        d3.select("#slot" + i.toString() )
        .transition()
        .attr('width', 0)
        .duration(200);
    }
}