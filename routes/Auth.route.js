const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const User = require("../models/User.model");
const Token = require("../models/Tokens.model");

const { authSchema, authLoginSchema } = require("../helpers/validation_schema");

const { signAccessToken } = require("../helpers/jwt_helper");

const { validateToken } = require("../helpers/validate_token");

router.post("/register", async (req, res, next) => {
  // register logic
  try {
    const { userName, email, password, role } = req.body;

    const result = await authSchema.validateAsync(req.body);

    const doesExist = await User.findOne({ email: result.email });
    if (doesExist) throw createError.Conflict(`${result.email} already exists`);

    const user = new User({
      userName: result.userName,
      email: result.email,
      password: result.password,
      role: result.role,
    });

    const savedUser = await user.save();
    const accessToken = await signAccessToken({ payload: savedUser.id });

    await Token.findOneAndUpdate(
      { userId: savedUser.id },
      { token: accessToken },
      { upsert: true, new: true }
    );

    res.send({ accessToken });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  // login logic
  // email, password in req
  try {
    const result = await authLoginSchema.validateAsync(req.body);

    const user = await User.findOne({ email: result.email });
    if (!user) throw createError.NotFound("User not registered");

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) throw createError.Unauthorized("email/password not valid");

    const accessToken = await signAccessToken({ payload: user.id });

    const token = await Token.findOneAndUpdate(
      { userId: user.id },
      { token: accessToken },
      { upsert: true, new: true }
    );

    res.send({ accessToken });
  } catch (error) {
    if (error.isJoi == true)
      return next(createError.BadRequest("Invalid email / password"));
    next(error);
  }
});
router.delete("/logout", async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) {
      throw createError.BadRequest("Token is required");
    }

    const deletedToken = await Token.findOneAndDelete({ token: token });
    if (!deletedToken) {
      throw createError.BadRequest("Invalid token");
    }

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
});

router.post("/validateToken", validateToken, async (req, res, next) => {
  // console.log(req.user.payload);
  res.send("validate");
});

module.exports = router;
