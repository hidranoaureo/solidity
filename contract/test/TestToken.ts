import { expect } from "chai";
import { ethers } from "hardhat";

const INITIAL_SUPPLY = ethers.parseUnits("1000", 18);
const ONE_TOKEN = ethers.parseUnits("1", 18);

describe("TestToken", function () {
  async function deployToken() {
    const [owner, alice] = await ethers.getSigners();
    const TestToken = await ethers.getContractFactory("TestToken");
    const token = await TestToken.deploy();
    await token.waitForDeployment();
    return { token, owner, alice };
  }

  describe("metadata", function () {
    it("has name TestToken, symbol STT, and 18 decimals", async function () {
      const { token } = await deployToken();

      expect(await token.name()).to.equal("TestToken");
      expect(await token.symbol()).to.equal("STT");
      expect(await token.decimals()).to.equal(18n);
    });
  });

  describe("ownership and supply", function () {
    it("sets the deployer as owner and mints 1000 tokens to them", async function () {
      const { token, owner } = await deployToken();

      expect(await token.owner()).to.equal(owner.address);
      expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
    });

    it("returns 0 for an address with no tokens", async function () {
      const { token, alice } = await deployToken();

      expect(await token.balanceOf(alice.address)).to.equal(0n);
    });
  });

  describe("mint", function () {
    it("lets the owner mint to another address", async function () {
      const { token, alice } = await deployToken();

      await token.mint(alice.address, ONE_TOKEN);

      expect(await token.balanceOf(alice.address)).to.equal(ONE_TOKEN);
    });

    it("reverts when a non-owner mints", async function () {
      const { token, alice } = await deployToken();

      await expect(token.connect(alice).mint(alice.address, ONE_TOKEN))
        .to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount")
        .withArgs(alice.address);
    });
  });

  describe("burn", function () {
    it("lets a holder burn their own tokens", async function () {
      const { token, owner } = await deployToken();

      await token.burn(ONE_TOKEN);

      expect(await token.balanceOf(owner.address)).to.equal(
        INITIAL_SUPPLY - ONE_TOKEN
      );
    });

    it("reverts when burning more than the caller balance", async function () {
      const { token, alice } = await deployToken();

      await expect(token.connect(alice).burn(ONE_TOKEN))
        .to.be.revertedWithCustomError(token, "ERC20InsufficientBalance")
        .withArgs(alice.address, 0, ONE_TOKEN);
    });
  });
});
