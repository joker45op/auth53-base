const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
require("./helpers/init_mongodb");

const AuthRoute = require("./routes/Auth.route");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res, next) => {
  res.send({ message: "Hello World" });
});

app.use("/auth", AuthRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
