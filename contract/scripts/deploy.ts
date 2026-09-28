import { ethers } from "hardhat";

async function main() {
  const TestToken = await ethers.getContractFactory("TestToken");
  const token = await TestToken.deploy();

  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("TestToken (STT) deployed to:", address);
  console.log("Copy this address into the backend .env as CONTRACT_ADDRESS");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
