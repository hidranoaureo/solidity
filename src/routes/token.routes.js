const { Router } = require("express");
const { burn, getBalance, mint } = require("../controllers/token.controller");
const { asyncHandler } = require("../middleware/asyncHandler");
const { validate } = require("../middleware/validate");
const {
  balanceParamsSchema,
  burnSchema,
  mintSchema,
} = require("../validations/token.schema");

const router = Router();

router.post("/mint", validate(mintSchema), asyncHandler(mint));
router.post("/burn", validate(burnSchema), asyncHandler(burn));
router.get(
  "/balance/:address",
  validate(balanceParamsSchema, "params"),
  asyncHandler(getBalance)
);

module.exports = router;
