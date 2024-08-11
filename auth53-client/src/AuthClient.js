const axios = require("axios")

class AuthClient {
  constructor(baseURL) {
    this.api = axios.create({ baseURL });
    this.token = null;
  }


  async login(email, password){
    try{
        const res = await this.api.post("/login", {email,password})
        this.token = res.data.accessToken
        return (this.token)
    }
    catch(error){
        console.log(error);
        throw error
    }
  }

  
}


module.exports = AuthClient;