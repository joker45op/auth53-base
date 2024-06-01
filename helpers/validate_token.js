const Token = require("../models/Tokens.model");
const createError = require("http-errors");
const { verifyToken } = require("../helpers/jwt_helper");

const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(createError.Unauthorized());
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(createError.Unauthorized());
    }

    const tok = await Token.findOne({ token:token });
    if (!tok) {
      return next(createError.Unauthorized("Invalid Token2"));
    }

    verifyToken(req, res, next);

    // req.token = token; // Store token in request for further use
  } catch (error) {
    next(createError.InternalServerError());
  }
};

module.exports = {validateToken};
