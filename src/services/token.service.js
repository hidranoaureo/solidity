const {
  getTokenContract,
  fromTokenAmount,
  toTokenAmount,
} = require("../blockchain/tokenClient");

async function mintTokens(to, amount) {
  const contract = getTokenContract();
  const value = await toTokenAmount(contract, amount);
  const tx = await contract.mint(to, value);
  const receipt = await tx.wait();

  return receipt.hash;
}

async function burnTokens(amount) {
  const contract = getTokenContract();
  const value = await toTokenAmount(contract, amount);
  const tx = await contract.burn(value);
  const receipt = await tx.wait();

  return receipt.hash;
}

async function getTokenBalance(address) {
  const contract = getTokenContract();
  const balance = await contract.balanceOf(address);

  return fromTokenAmount(contract, balance);
}

module.exports = { mintTokens, burnTokens, getTokenBalance };
