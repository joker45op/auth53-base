const mongoose = require("mongoose");
require("dotenv").config();
console.log("monogoose");
mongoose
  // .connect("mongodb://127.0.0.1:27017/", { dbName: "auth53" })
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

mongoose.connection.on("connected", () => {
  console.log("mongodb is connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("mongodb is disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
