
module.exports.areaFinder = function (query) {
    var { londonAreas } = require('../data/london-LA.js');
    var { areas } = require('../data/areas.js');
    var { neighbourhoodsOne } = require('../data/neighbourhood-1.js');
    var { neighbourhoodsTwo } = require('../data/neighbourhood-2.js');
    var { neighbourhoodsThree } = require('../data/neighbourhood-3.js');
    var { neighbourhoodsFour } = require('../data/neighbourhood-4.js');
    var { region } = require('../data/region.js');

    // var neighbourhoodsOne = require('../data/neighbourhood-1.json');
    // var neighbourhoodsTwo = require('../data/neighbourhood-2.json');
    // var neighbourhoodsThree = require('../data/neighbourhood-3.json');
    // var neighbourhoodsFour = require('../data/neighbourhood-4.json');
    // var region = require('../data/region');

    const londonFeatures = londonAreas.features;
    const citiesFeatures = areas.features;
    const nAreasOneF = neighbourhoodsOne.features;
    const nAreasTwoF = neighbourhoodsTwo.features;
    const nAreasThreeF = neighbourhoodsThree.features;
    const nAreasFourF = neighbourhoodsFour.features;
    const regionsF = region.features;


    var requestquery = query.toLowerCase();
    var requestToProcess = requestquery.replace(/-/g, ' ');

    let resultToPass;


    var result = citiesFeatures.find(c => c.properties.LAD22NM.toLowerCase() === requestToProcess);
    if (result) {
        //res.send(result);
        resultToPass = {
            "type": "Feature",
            "properties": {
                "areaType": "city",
                "officialCode": result.properties.LAD22CD,
                "name": result.properties.LAD22NM
            },
            "geometry": result.geometry
        };
    } else {
        var firstcheck = regionsF.find(c => c.properties.geo_label.toLowerCase() === requestToProcess);
        if (firstcheck) {
            //res.send(firstcheck);
            resultToPass = {
                "type": "Feature",
                "properties": {
                    "areaType": "region",
                    "officialCode": firstcheck.properties.geo_code,
                    "name": firstcheck.properties.name
                },
                "geometry": firstcheck.geometry
            };

        } else {
            var check = nAreasOneF.find(c => c.properties.WD22NM.toLowerCase() === requestToProcess);
            if (check) {
                resultToPass = {
                    "type": "Feature",
                    "properties": {
                        "areaType": "neighbourhood",
                        "officialCode": check.properties.WD22CD,
                        "name": check.properties.WD22NM
                    },
                    "geometry": check.geometry
                };
                // res.send(check);
            } else {
                var checkTwo = nAreasTwoF.find(c => c.properties.WD22NM.toLowerCase() === requestToProcess);
                if (checkTwo) {
                    resultToPass = {
                        "type": "Feature",
                        "properties": {
                            "areaType": "neighbourhood",
                            "officialCode": checkTwo.properties.WD22CD,
                            "name": checkTwo.properties.WD22NM
                        },
                        "geometry": checkTwo.geometry
                    };
                    // res.send(checkTwo);
                } else {
                    var checkThree = nAreasThreeF.find(c => c.properties.WD22NM.toLowerCase() === requestToProcess);
                    if (checkThree) {
                        resultToPass = {
                            "type": "Feature",
                            "properties": {
                                "areaType": "neighbourhood",
                                "officialCode": checkThree.properties.WD22CD,
                                "name": checkThree.properties.WD22NM
                            },
                            "geometry": checkThree.geometry
                        };
                        // res.send(checkThree);
                    } else {
                        var checkFour = nAreasFourF.find(c => c.properties.WD22NM.toLowerCase() === requestToProcess);
                        if (checkFour) {
                            resultToPass = {
                                "type": "Feature",
                                "properties": {
                                    "areaType": "neighbourhood",
                                    "officialCode": checkFour.properties.WD22CD,
                                    "name": checkFour.properties.WD22NM
                                },
                                "geometry": checkFour.geometry
                            };
                            // res.send(checkFour);
                        } else {
                            resultToPass = "we can't find what you are looking for";
                            // res.send("we can't find what you are looking for");
                        }
                    }
                }
            }
        }
    }

    return resultToPass;

};
