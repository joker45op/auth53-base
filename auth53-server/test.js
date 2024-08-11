const AuthClient = require("../auth53-client/src/AuthClient");

try {
  const client = new AuthClient("http://localhost:3000/auth");
  const token = client
    .login("abhi531@gmail.com", "Create53pass")
    .then((res) => {
      console.log(res);
    });

  console.log("Logged in with token:", token);
} catch (error) {
  console.error("Error loading module or during authentication:", error);
}
