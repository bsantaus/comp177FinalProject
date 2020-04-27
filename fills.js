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
