
module.exports.poiName = function () {
    // var { areas } = require('../data/areas.js');
    var { dataCentroids } = require('../data/dataCentroids.js');

    const poiName = dataCentroids.features;
    var getMonuments = poiName.filter(item => item.properties.fclass === 'monument' || item.properties.fclass === 'attraction');

    let poiNames = [];
    for (let i = 0; i < getMonuments.length; i++) {
        let openName = getMonuments[i].properties.name;
        if (openName !== null) {
            let clean = openName.toLowerCase();
            poiNames.push(clean);
        }
    }

    object = {};

    for (let p = 0; p < poiNames.length; p++) {
        object[poiNames[p]] = "Place";
    }
    return object;
};
