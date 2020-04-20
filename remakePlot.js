function updateViz() {
    clearSlotBar();
    d3.select("#gameName").text("Game Metadata");
    d3.select("#metaApp").text("First Appearance:");
    d3.select("#metaCat").text("Categories: ");
    d3.select("#metaTotal").text("Total Appearances: ");
    d3.select("#metaFrank").text("Total Appearances Rank: ");
    d3.select("#metaActive").text("Seasons Active: ");
    d3.select("#metaWPct").text("Overall Win %: ");
    var categSel = document.getElementById("Categories");
    var viewSel = document.getElementById("View");
    var plotSel = document.getElementById("Plot");
    var actSel = document.getElementById("Active");
    currCat = categSel.options[categSel.selectedIndex].value;
    currView = viewSel.options[viewSel.selectedIndex].value;
    currPlot = plotSel.options[plotSel.selectedIndex].value;
    currAct = actSel.options[actSel.selectedIndex].value;
    var arr = getInitArr(currCat);
    if (currCat != 'cat' && currAct == 'y') {
        arr = removeInactive(arr);
    }
    if (currCat != 'cat') arr = trimSortArr(arr, currView, currPlot);
    else arr = modCatArr(arr, currPlot);
    d3.select("#yLabel").text(currPlot == 'fr' ? (currCat == 'cat' ? fcText : fgText) : wlText);
    remakeGraphic(currentShape, currPlot, arr, currCat == 'cat' ? categoryData : gameData, currCat == 'cat' ? nextGraphicCat : nextGraphicGame);
}

function remakeGraphic(item, plot, arr, map, func) {
    if (item == 'circle') {
        d3.selectAll(item)
            .transition()
            .style("opacity", 0)
            .attr('cy', heightShift)
            .duration(1000)
            .remove()
            .call(endAll, func, plot, arr, map); 
    } else {
        ctrSvg.selectAll(item)
            .transition()
            .style("opacity", 0)
            .attr('y', heightShift)
            .attr('height', 0)
            .duration(1000)
            .remove()
            .call(endAll, func, plot, arr, map);
    }
}


function endAll(transition, callback, plot, arr, map) {
  var n = 0
  transition.each(() => ++n)
    .on('end', function () {
        !--n;
        if (n == 0) callback(plot, arr, map);
    });
}

function nextGraphicGame(plot, arr, map) {
    if (plot == 'fwl') {
            createScatter(arr, map);
            currentShape = 'circle';
    } else {
            createBar(arr, map);
            currentShape = 'rect';
    }
}

function nextGraphicCat(plot, arr, map) {
    if (plot == 'fwl') {
            createScatterCat(arr, map);
            currentShape = 'circle';
    } else {
            createBarCat(arr, map);
            currentShape = 'rect';
    }
}

function getInitArr(categ) {
    var arr = [];
    switch(categ) {
        case "all":
            arr = games;
            break;
        case "cat":
            arr = categories.map(c => { return {name:c, wl:categoryData.get(c).wl} });
            break;
        default:
            let c = ""
            switch (categ) {
                case "car":
                    c = "CarGames";
                    break;
                case "cash":
                    c = "CashGames";
                    break;
                case "small":
                    c = "SmallPrizeGames";
                    break;
                case "grocery":
                    c = "GroceryProductGames";
                    break;
                case "onep":
                    c = "OnePrizeGames"
                    break;
                case "twop":
                    c = "TwoPrizeGames"
                    break;
                case "threep":
                    c = "ThreePrizeGames"
                    break;
                case "fourp":
                    c = "FourFivePrizeGames"
            }    
            for (var i = 0; i < games.length; i++) {
                if (gameData.get(games[i]).Category.split(',').includes(c))
                    arr.push(games[i]);
            }
    }
    return arr;
}

function removeInactive(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (gameData.get(arr[i]).f47 == '-') {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
}

function trimSortArr(arr, view, plot) {
    temp = [];
    var itemVal;
    var maxfr = d3.max(arr, function(a) { return parseFloat(gameData.get(a).fTotal) / parseFloat(gameData.get(a).fActive);  });

    for (var i = 0; i < arr.length; i++) {
        if (plot == 'fwl') {
            if (gameData.get(arr[i]).wPct != undefined) //rethink rankings here
                itemVal = parseFloat(gameData.get(arr[i]).fTotal) / parseFloat(gameData.get(arr[i]).fActive) / maxfr + parseFloat(gameData.get(arr[i]).wPct);
            else
                continue;
        } else if (plot == "fr") {
            itemVal = parseFloat(gameData.get(arr[i]).fTotal) / parseFloat(gameData.get(arr[i]).fActive);
        } else {
            if (gameData.get(arr[i]).wPct != undefined) {
                itemVal = parseFloat(gameData.get(arr[i]).wPct * 100);
            }
            else
                continue;
        }
        if (view == 'all' || temp.length < parseInt(view)) {
            temp.push({name:arr[i], val:itemVal});
            temp.sort((a,b) => {
                if (a.val < b.val) return -1;
                else if (a.val == b.val) return 0;
                else return 1;
            });
        }
        else if (itemVal) {
            if (temp[0].val < itemVal) {
                temp[0] = {name:arr[i], val:itemVal};
                temp.sort((a,b) => {
                    if (a.val < b.val) return -1;
                    else if (a.val == b.val) return 0;
                    else return 1;
                });
            }
        }
    }
    return temp;
}

function modCatArr(arr, plot) {
    if (plot == 'fwl') {
        arr = arr.map(p => { 
            let catName = p.name;
            let wl = p.wl.split('-');
            wl[0] = parseInt(wl[0]);
            wl[1] = parseInt(wl[1]);
            let freq = (wl[0] + wl[1]) / 19;
            let pct = wl[0] / (wl[0] + wl[1]) * 100;
            return {name:catName, freq:freq, pct:pct};
        }); 
    } else if (plot == 'fr') {
        arr = arr.map(p => { 
            let catName = p.name;
            let wl = p.wl.split('-');
            wl[0] = parseInt(wl[0]);
            wl[1] = parseInt(wl[1]);
            let freq = (wl[0] + wl[1]) / 19;
            return {name:catName, val:freq};
        });
        arr = arr.sort((a,b) => {
            if (a.val < b.val) return -1;
            else if (a.val == b.val) return 0;
            else return 1;
        });
    } else {
        arr = arr.map(p => { 
            let catName = p.name;
            let wl = p.wl.split('-');
            wl[0] = parseInt(wl[0]);
            wl[1] = parseInt(wl[1]);
            let pct = wl[0] / (wl[0] + wl[1]) * 100;
            return {name:catName, val:pct};
        });
        arr = arr.sort((a,b) => {
            if (a.val < b.val) return -1;
            else if (a.val == b.val) return 0;
            else return 1;
        })
    }
    return arr;
}
