const { Router } = require("express");
const healthRoutes = require("./health.routes");
const tokenRoutes = require("./token.routes");

const router = Router();

router.use("/health", healthRoutes);
router.use("/", tokenRoutes);

module.exports = router;
