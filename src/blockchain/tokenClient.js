const {
  Contract,
  JsonRpcProvider,
  Wallet,
  formatUnits,
  isAddress,
  parseUnits,
} = require("ethers");
const { env } = require("../config/env");
const { tokenABI } = require("../constants/tokenABI");
const { ConfigError } = require("../errors/AppError");

let cachedClient;

function requireValue(name, value) {
  if (!value) {
    throw new ConfigError(
      `Missing ${name}. Copy .env.example to .env and set it after deploying the contract.`
    );
  }

  return value;
}

function buildClient() {
  const rpcUrl = requireValue("RPC_PROVIDER_URL", env.rpcProviderUrl);
  const contractAddress = requireValue("CONTRACT_ADDRESS", env.contractAddress);
  const privateKey = requireValue("WALLET_PRIVATE", env.walletPrivate);

  if (!isAddress(contractAddress)) {
    throw new ConfigError("CONTRACT_ADDRESS is not a valid Ethereum address.");
  }

  const provider = new JsonRpcProvider(rpcUrl);
  const wallet = new Wallet(privateKey, provider);
  const contract = new Contract(contractAddress, tokenABI, wallet);

  return { provider, wallet, contract };
}

function getTokenClient() {
  if (!cachedClient) {
    cachedClient = buildClient();
  }

  return cachedClient;
}

function getTokenContract() {
  return getTokenClient().contract;
}

async function getTokenDecimals(contract) {
  try {
    return Number(await contract.decimals());
  } catch {
    return 0;
  }
}

async function toTokenAmount(contract, amount) {
  const decimals = await getTokenDecimals(contract);
  return parseUnits(amount.toString(), decimals);
}

async function fromTokenAmount(contract, amount) {
  const decimals = await getTokenDecimals(contract);
  const formatted = formatUnits(amount, decimals);
  const asNumber = Number(formatted);

  return Number.isInteger(asNumber) ? asNumber : formatted;
}

module.exports = {
  getTokenClient,
  getTokenContract,
  getTokenDecimals,
  toTokenAmount,
  fromTokenAmount,
};
