const JWT = require("jsonwebtoken");
const createError = require("http-errors");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "super secret";

const signAccessToken = (payload, expiresIn = "1h") => {
  // console.log(payload);
  return new Promise((resolve, reject) => {
    JWT.sign(
      payload,
      JWT_SECRET_KEY,
      {
        expiresIn: expiresIn,
      },
      (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return;
        } else resolve(token);
      }
    );
  });
};

  const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(createError.Unauthorized());
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(createError.Unauthorized());
    }

    JWT.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return next(createError.Unauthorized("Invalid Token"));
        } else {
          return next(createError.Unauthorized());
        }
      }

      req.user = decoded;
      next();
    });
  };
module.exports = { signAccessToken, verifyToken };
