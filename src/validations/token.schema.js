const { isAddress } = require("ethers");
const Joi = require("joi");

const ethereumAddress = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (!isAddress(value)) {
      return helpers.error("any.invalid");
    }

    return value;
  }, "ethereum address");

const mintSchema = Joi.object({
  to: ethereumAddress.messages({
    "any.required": "A valid recipient address is required.",
    "string.empty": "A valid recipient address is required.",
    "any.invalid": "A valid recipient address is required.",
  }),
  amount: Joi.number().positive().required().messages({
    "any.required": "A positive amount is required.",
    "number.base": "A positive amount is required.",
    "number.positive": "A positive amount is required.",
  }),
});

const burnSchema = Joi.object({
  amount: Joi.number().positive().required().messages({
    "any.required": "A positive amount is required.",
    "number.base": "A positive amount is required.",
    "number.positive": "A positive amount is required.",
  }),
});

const balanceParamsSchema = Joi.object({
  address: ethereumAddress.messages({
    "any.required": "A valid address is required.",
    "string.empty": "A valid address is required.",
    "any.invalid": "A valid address is required.",
  }),
});

module.exports = { mintSchema, burnSchema, balanceParamsSchema };
