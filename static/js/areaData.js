exports.areaData = function () {

    var areas = require('./../../data/geo/areas.json');
    var areasTwo = require('./../../data/geo/areas2.json');
    var neighbourhoodsOne = require('./../../data/geo/neighbourhood-1.json');
    var neighbourhoodsTwo = require('./../../data/geo/neighbourhood-2.json');
    var neighbourhoodsThree = require('./../../data/geo/neighbourhood-3.json');
    var neighbourhoodsFour = require('./../../data/geo/neighbourhood-4.json');
    var region = require('./../../data/geo/areasOne.json');



    const towns = areas.features;
    const townsTwo = areasTwo.features;
    const nAreasOne = neighbourhoodsOne.features;
    const nAreasTwo = neighbourhoodsTwo.features;
    const nAreasThree = neighbourhoodsThree.features;
    const nAreasFour = neighbourhoodsFour.features;


    // modifying all the cities (Wards)
    let modifiedtowns = Object.entries(towns).reduce((obj, item) => {
        obj.push(
            {
                "type": "Feature",
                "properties": {
                    "areaType": "city",
                    "officialCode": item[1].properties.LAD22CD,
                    "name": item[1].properties.LAD22NM
                },
                "geometry": item[1].geometry
            }
        );
        return obj;
    }, []);

    let modifiedtownsTwo = Object.entries(townsTwo).reduce((obj, item) => {
        obj.push(
            {
                "type": "Feature",
                "properties": {
                    "areaType": "city",
                    "officialCode": item[1].properties.LAD22CD,
                    "name": item[1].properties.LAD22NM
                },
                "geometry": item[1].geometry
            }
        );
        return obj;
    }, []);




    // modifying all the neighbourhoods (Wards)
    let modNeiOne = Object.entries(nAreasOne).reduce((obj, item) => {
        obj.push(
            {
                "type": "Feature",
                "properties": {
                    "areaType": "neighbourhood",
                    "officialCode": item[1].properties.WD22CD,
                    "name": item[1].properties.WD22NM
                },
                "geometry": item[1].geometry
            }
        );
        return obj;
    }, []);


    let modNeiTwo = Object.entries(nAreasTwo).reduce((obj, item) => {
        obj.push(
            {
                "type": "Feature",
                "properties": {
                    "areaType": "neighbourhood",
                    "officialCode": item[1].properties.WD22CD,
                    "name": item[1].properties.WD22NM
                },
                "geometry": item[1].geometry
            }
        );
        return obj;
    }, []);

    let modNeiThree = Object.entries(nAreasThree).reduce((obj, item) => {
        obj.push(
            {
                "type": "Feature",
                "properties": {
                    "areaType": "neighbourhood",
                    "officialCode": item[1].properties.WD22CD,
                    "name": item[1].properties.WD22NM
                },
                "geometry": item[1].geometry
            }
        );
        return obj;
    }, []);

    let modNeiFour = Object.entries(nAreasFour).reduce((obj, item) => {
        obj.push(
            {
                "type": "Feature",
                "properties": {
                    "areaType": "neighbourhood",
                    "officialCode": item[1].properties.WD22CD,
                    "name": item[1].properties.WD22NM
                },
                "geometry": item[1].geometry
            }
        );
        return obj;
    }, []);

    // let allFeaturesOne = [];

    // featuresArrayOne = [...region, ...modifiedtowns, ...modNeiOne, ...modNeiTwo, ...modNeiThree, ...modNeiFour];

    // allFeaturesOne.push(featuresArrayOne);
    // let allFeaturesTwo = [];

    // featuresArrayTwo = [...region, ...modifiedtowns, ...modNeiOne, ...modNeiTwo, ...modNeiThree, ...modNeiFour];

    // allFeaturesTwo.push(featuresArrayTwo);


    return (modifiedtowns);
};