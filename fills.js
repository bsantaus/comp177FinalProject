/* The Price is Right Visualization
 * Comp177 Final Project
 * Completed May 1 2020
 * Created by Ben Santaus
 * 
 * fills.js
 * Contains one function to get the correct color/gradient for an element
*/


function getFill(cat) {
    if (cat == "-") {
        return "#a1a1a1";
    }
    cat = cat.split(",");
    if (cat.length == 1) 
        return categoryData.get(cat[0]).color;
    else {
        return "url(#" + categoryData.get(cat[0]).abbr + categoryData.get(cat[1]).abbr + "Grad)";
    }
}
