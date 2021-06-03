const Joi = require("joi");

exports.insertStratSchema = Joi.object({
  key: Joi.string().required().max(35),
  content: Joi.string().max(250).required(),
  UserId: Joi.string().required(),
});

exports.updateStratSchema = Joi.object({
  key: Joi.string().min(4).max(35),
  content: Joi.string().min(4).max(250),
});
