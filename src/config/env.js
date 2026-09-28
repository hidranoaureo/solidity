const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

dotenvExpand.expand(dotenv.config());

function readNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: readNumber("PORT", 4972),
  rpcProviderUrl: process.env.RPC_PROVIDER_URL ?? "",
  contractAddress: process.env.CONTRACT_ADDRESS ?? "",
  walletPrivate: process.env.WALLET_PRIVATE ?? "",
};

const isProduction = env.nodeEnv === "production";

module.exports = { env, isProduction };
