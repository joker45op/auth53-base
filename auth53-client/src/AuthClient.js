const axios = require("axios");

class AuthClient {
  constructor(baseURL) {
    this.api = axios.create({ baseURL });
    this.token = null;
  }

  async register(userName, email, password, role) {
    try {
      const res = await this.api.post("register",{userName, email, password, role})
      this.token = res.data.accessToken;
      return { token: this.token };
    } catch (error) {}
  }

  async login(email, password) {
    try {
      const res = await this.api.post("login", { email, password });
      this.token = res.data.accessToken;
      return { token: this.token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.api.delete("logout", {
        data: { token: this.token },
      });
      this.token = null;
      console.log("logout");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async validateToken() {
    try {
      const res = await this.api.post(
        "validateToken",
        {},
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      // console.log(res);
    } catch (error) {
      console.log(error.response.data.error);
      // throw error
    }
  }
}

module.exports = AuthClient;
