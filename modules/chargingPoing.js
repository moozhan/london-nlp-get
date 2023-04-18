module.exports.chargingPointLoader = async function (url) {

    const axios = require('axios');

    try {
        const response = await axios.get(url);
        const responsetopage = response.data;
        return responsetopage;
        //res.send(responsetopage);
    } catch (error) {
        console.error(error);
    }

};

