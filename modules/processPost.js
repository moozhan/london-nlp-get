var namesList = require('../modules/namesList');
var poiNameList = require('../modules/poiName');
var dataCentroids = require('../modules/dataCentroids');
var areaFinder = require('../modules/areaFinder');
var { dataCentroids } = require('../data/dataCentroids.js');


const nlp = require('compromise');
let spatial = ['in', 'near', 'along', 'through', 'beside', 'at', 'at the end of', 'at the heart of', 'around', 'close to', 'the nearest', 'far from', 'the furthest', 'out of'];

module.exports.processPost = function (query) {
    const resultName = namesList.namesList();
    const poiopen = poiNameList.poiName();

    const result = dataCentroids;
    const checked = result.features;
    const allPlacesMain = checked.filter(item => item.properties.fclass === 'monument' || item.properties.fclass === 'attraction');

    // objectPoi = {};
    // for (let p = 0; p < entities.length; p++) {
    //     objectPoi[entities[p]] = "Poi";
    // }
    objectSpa = {};
    for (let p = 0; p < spatial.length; p++) {
        objectSpa[spatial[p]] = "Spatial";
    }
    // objectComp = {};
    // for (let p = 0; p < complex.length; p++) {
    //     objectComp[complex[p]] = "Complex";
    // }
    // objectUrb = {};
    // for (let p = 0; p < urban.length; p++) {
    //     objectUrb[urban[p]] = "Urban";
    // }
    let finalTags = Object.assign({}, resultName, poiopen, objectSpa);

    nlp.plugin({
        words: finalTags
    });



    let doc = nlp(query);
    let sentences = doc.json().map(o => o.text);
    let allSentences = [];
    let allLocations = [];
    let allSpatial = [];
    let allContain = [];
    let allUrban = [];

    for (i in sentences) {
        let sentnlp = nlp(sentences[i]);
        const sent = sentnlp.normalize({
            whitespace: true,
            punctuation: true,
            unicode: true,
            contractions: true,
            acronyms: true,
            parentheses: true,
            possessives: true,
            plurals: true,
            verbs: true,
            honorifics: false,
        }).out('text');
        var sentCl = sent.split('.').join(' ').split('!').join(' ').split('?').join(' ').toLowerCase();
        let cleansent = nlp(sentCl);


        // ---------------- find all the locations
        var loci = cleansent.places().out('array');
        for (i in loci) {
            var getName = allPlacesMain.filter(function (item) {
                return item.properties.name !== null && item.properties.name.toLowerCase() === loci[i]
            });
            if (getName.length !== 0) {
                for (j in getName)
                    allLocations.push(getName[j]);
            }
            const checkNames = areaFinder.areaFinder(loci[i]);
            if (checkNames !== null) {
                allLocations.push(checkNames);
            }
        }

        //------------------------find all Spatial things

        var spatiality = cleansent.match('#Spatial . #Place').out('array');

        if (spatiality.length !== 0) {
            for (i in spatiality) {
                allSpatial.push(spatiality[i]);
            }
        }

    }

    let finalResult = {
        'result': {
            'places': allLocations,
            'spatialities': allSpatial
        }
    }

    return finalResult;

}