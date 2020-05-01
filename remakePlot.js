/* The Price is Right Visualization
 * Comp177 Final Project
 * Completed May 1 2020
 * Created by Ben Santaus
 * 
 * remakePlot.js
 * Contains functions used to clear the current plot and remake it
 * according to the options selected by the user.
*/


//Bound to each of the dropdowns and runs whenever the value changes in any.
function updateViz() {
    var categSel = document.getElementById("Categories");
    var viewSel = document.getElementById("View");
    var plotSel = document.getElementById("Plot");
    var actSel = document.getElementById("Active");
    var newCat = categSel.options[categSel.selectedIndex].value;
    var newView = viewSel.options[viewSel.selectedIndex].value;
    var newPlot = plotSel.options[plotSel.selectedIndex].value;
    var newAct = actSel.options[actSel.selectedIndex].value;

    //only run the rest if the viz needs to change
    if (newCat != currCat || newView != currView || newPlot != currPlot || newAct != currAct) {
        currCat = newCat; currView = newView; currPlot = newPlot; currAct = newAct;
        var arr = getInitArr(currCat); //get the initial set of games/categories
        if (currCat != 'cat' && currAct == 'y') { //if not grouped by category, remove inactive games if necessary
            arr = removeInactive(arr);
        }
        if (currCat != 'cat') arr = trimSortArr(arr, currView, currPlot); //if less than all the games and not grouped by category, get the top ones and sort them in ascending order
        else arr = modCatArr(arr, currPlot); //if grouped by category, sort.
        d3.select("#yLabel").text(currPlot == 'fr' ? (currCat == 'cat' ? fcText : fgText) : wlText); //set the appropriate y axis label.
        remakeGraphic(currentShape, currPlot, arr, currCat == 'cat' ? categoryData : gameData, currCat == 'cat' ? nextGraphicCat : nextGraphicGame); //use array to change viz.

        //if there's a clicked element, don't clear metadata
        if (!clicked || currCat == 'cat' || !arr.map(a => a.name).includes(clicked)) {
            clicked = undefined;
            clearSlotBar();
            d3.select("#gameName").text("Game Metadata");
            d3.select("#metaApp").text("First Appearance:");
            d3.select("#metaCat").text("Categories: ");
            d3.select("#metaTotal").text("Total Appearances: ");
            d3.select("#metaFrank").text("Total Appearances Rank: ");
            d3.select("#metaActive").text("Seasons Active: ");
            d3.select("#metaWPct").text("Overall Win %: ");
        }
    }
}

//remove all elements currently on the graph, then move on once theyre all removed.
//func is either one to create next category graphic or next game graphic
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


//count how many things are being removed, once the last one is done, call the callback function
function endAll(transition, callback, plot, arr, map) {
  var n = 0
  transition.each(() => ++n)
    .on('end', function () {
        !--n;
        if (n == 0) callback(plot, arr, map);
    });
}

//route to the appropriate chart to make
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

//get teh array of elements in a category
function getInitArr(categ) {
    var arr = [];
    switch(categ) {
        case "all":
            arr = games.slice(); //need to do this or it's a reference to games. Bad.
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
            for (var i = 0; i < games.length; i++) { //get all the games of a certain category
                if (gameData.get(games[i]).Category.split(',').includes(c))
                    arr.push(games[i]);
            }
    }
    return arr;
}

function removeInactive(arr) { //get those inactive games out of the array
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
            //determine value that will be used to rank and sort games
            //if there's no win percentage, exclude this one
            if (gameData.get(arr[i]).wPct != undefined) 
                itemVal = parseFloat(gameData.get(arr[i]).fTotal) / parseFloat(gameData.get(arr[i]).fActive) / maxfr + parseFloat(gameData.get(arr[i]).wPct);
            else
                continue;
        } else if (plot == "fr") {
            itemVal = parseFloat(gameData.get(arr[i]).fTotal) / parseFloat(gameData.get(arr[i]).fActive);
        } else {
            //no win percentage - exclude this one
            if (gameData.get(arr[i]).wPct != undefined) {
                itemVal = parseFloat(gameData.get(arr[i]).wPct * 100);
            }
            else
                continue;
        }
        //push items onto list and sort
        if (view == 'all' || temp.length < parseInt(view)) {
            temp.push({name:arr[i], val:itemVal});
            temp.sort((a,b) => {
                if (a.val < b.val) return -1;
                else if (a.val == b.val) return 0;
                else return 1;
            });
        }
        else if (itemVal) {
            //if we're at capacity, check if there's one to bump
            //if so, add and sort list
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
    //add elements to list based on what the plot is going to be
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
