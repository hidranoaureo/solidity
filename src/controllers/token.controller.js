const {
  burnTokens,
  getTokenBalance,
  mintTokens,
} = require("../services/token.service");

const mint = async (req, res) => {
  const { to, amount } = req.body;
  const transactionHash = await mintTokens(to, amount);

  return res.status(200).json({
    message: "Tokens minted successfully",
    transactionHash,
  });
};

const burn = async (req, res) => {
  const { amount } = req.body;
  const transactionHash = await burnTokens(amount);

  return res.status(200).json({
    message: "Tokens burned successfully",
    transactionHash,
  });
};

const getBalance = async (req, res) => {
  const balance = await getTokenBalance(req.params.address);

  return res.status(200).json({ balance });
};

module.exports = { mint, burn, getBalance };
