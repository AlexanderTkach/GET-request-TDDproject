const axios = require("axios");

class User {
  constructor(user) {
    this.user = user;
  }
  async getData(url = "http://www.example.com") {
    const response = await axios.get(url);

    if (
      response.status === 200 &&
      response.headers["content-type"] ===
        "text/html; charset=UTF-8"
    ) {
      console.log(response);
      return response;
    } else if (response.status === 500) {
      setTimeout(() => {
        this.retryRequest();
        console.error("Server is not responding");
      }, 2000);
    } else if (response.status === 400) {
      throw new Error("Bad Request");
    } else if (response.status === 404) {
      throw new Error("Not Found");
    } else if (
      response.headers["content-type"] !==
      "text/html; charset=UTF-8"
    ) {
      throw new Error("not text/html");
    }
  }
  async retryRequest() {
    const result = await this.getData(
      (url = "http://www.example.com")
    );
    return result;
  }
}

module.exports = { User };
