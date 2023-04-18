
module.exports.dataCentroids = function (query) {
    var requestquery = query.toLowerCase();
    console.log(requestquery);
    var { dataCentroids } = require('../data/dataCentroids.js');
    const datapassed = dataCentroids;
    return datapassed;

};
