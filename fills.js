function getFill(cat) {
    if (!cat) {
        return "black";
    }
    cat = cat.split(",");
    if (cat.length == 1) 
        return categoryData.get(cat[0]).color;
    else {
        console.log(cat);
        return "url(#" + categoryData.get(cat[0]).abbr + categoryData.get(cat[1]).abbr + "Grad)";
    }
}

function getFillSlot(cat) {
    if (!cat) {
        return "black";
    }
    cat = cat.split(",");
    if (cat.length == 1) 
        return categoryData.get(cat[0]).color;
    else {
        console.log(cat);
        return "url(#" + categoryData.get(cat[0]).abbr + categoryData.get(cat[1]).abbr + "GradSlot)";
    }
}