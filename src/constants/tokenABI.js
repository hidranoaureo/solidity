const tokenABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function owner() view returns (address)",
  "function mint(address to, uint256 amount)",
  "function burn(uint256 amount)",
  "function balanceOf(address account) view returns (uint256)",
];

module.exports = { tokenABI };
