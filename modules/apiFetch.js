const axios = require('axios');

module.exports = {
    getData: async (url) => {
        let response = await axios.get(url);
        return response;
    }

}