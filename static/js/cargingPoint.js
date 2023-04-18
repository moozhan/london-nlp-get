
const axios = require('axios');

async function getUser(url) {
    try {
    const response = await axios.get(url);
    const responsetopage = response.data;
    return responsetopage;
    //res.send(responsetopage);
    } catch (error) {
    console.error(error);
    }
};  

module.exports = { getUser };
