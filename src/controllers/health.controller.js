const { getHealthStatus } = require("../services/health.service");

const getHealth = (_req, res) => {
  return res.status(200).json(getHealthStatus());
};

module.exports = { getHealth };
