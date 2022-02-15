const axios = require('axios');

const getData = async (url) => {
    const response = await axios.get(url);
    return response
}

module.exports = {getData}