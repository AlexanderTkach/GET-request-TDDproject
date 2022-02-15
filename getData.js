const axios = require('axios');

class User {
    constructor(user) {
        this.user = user;
    }
    async getData (url) {
        const response = await axios.get(url);
        return response
    }
}



module.exports = {User}