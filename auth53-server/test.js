const AuthClient = require("../auth53-client/src/AuthClient");

async function test() {
  try {
    const client = new AuthClient("http://localhost:3000/auth"); 
    const c = await client.register("abhi53", "ari53s4@gmail.com", "Create53pass", "user");
    console.log(c);
    const token = await client.login("abhi531@gmail.com", "Create53pass");
    console.log("Logged in with token:", token);
    // setTimeout(()=>{
    client.validateToken();
    client.logout();

    // },3000)
  } catch (error) {
    console.error("Error loading module or during authentication:", error);
  }
}

test();
