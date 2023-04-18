
module.exports.namesList = function () {
    // var { areas } = require('../data/areas.js');
    var { londonAreas } = require('../data/london-LA.js');
    var { londonNeigh } = require('../data/londonNeigh');
    var { region } = require('../data/region.js');


    const citiesFeatures = londonAreas.features;
    const nAreasOneF = londonNeigh.features;
    const regionsF = region.features;

    let locationNames = [];
    for (let i = 0; i < citiesFeatures.length; i++) {
        locationNames.push(londonAreas.features[i].properties.LAD22NM);
    }
    for (let j = 0; j < nAreasOneF.length; j++) {
        locationNames.push(londonNeigh.features[j].properties.WD22NM);
    }
    for (let k = 0; k < regionsF.length; k++) {
        locationNames.push(region.features[k].properties.geo_label);
    }

    object = {};

    for (let p = 0; p < locationNames.length; p++) {
        object[locationNames[p]] = "Place";
    }
    return object;
};
