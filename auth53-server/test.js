// const AuthClient = require("../auth53-client/src/AuthClient");

const AuthClient = require("auth53-client")

async function test() {
  try {
    const client = new AuthClient("http://localhost:3000/auth"); 
    const c = await client.register("abhi53", "ari53s4@gmail.com", "Create53pass", "user");
    const token = await client.login("abhi531@gmail.com", "Create53pass");
    
    client.validateToken();
    client.logout();

    // },3000)
  } catch (error) {
    console.error("Error loading module or during authentication:", error);
  }
}

test();
