const Joi = require("@hapi/joi");

const authSchema = Joi.object({
  userName: Joi.string().min(3).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d!@#$%^&*()_+\\-=\\[\\]{};:\\'\",.<>\\/?]{8,}$"
      )
    )
    .required(),
  role: Joi.string().valid("user", "admin").default("user"),
});

const authLoginSchema = Joi.object({
  email: Joi.string().lowercase().email().required(),
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d!@#$%^&*()_+\\-=\\[\\]{};:\\'\",.<>\\/?]{8,}$"
      )
    )
    .required(),
});

module.exports = { authSchema, authLoginSchema };
