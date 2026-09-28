// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TestToken
 * @notice Replace this stub with a working token. Keep the contract name TestToken.
 *
 * Required behavior (see test/TestToken.ts — do not change those tests):
 * - Name: TestToken
 * - Symbol: STT
 * - decimals(): 18
 * - Constructor mints 1000 tokens (1000 * 10**18) to the deployer
 * - mint(address to, uint256 amount) — owner only
 * - burn(uint256 amount) — caller burns from their own balance
 * - balanceOf(address account)
 * - owner() — deployer is the owner
 *
 * Use OpenZeppelin ERC20, ERC20Burnable, and Ownable.
 */
contract TestToken {
    constructor() {}

    function name() external pure returns (string memory) {
        revert("Not implemented");
    }

    function symbol() external pure returns (string memory) {
        revert("Not implemented");
    }

    function decimals() external pure returns (uint8) {
        revert("Not implemented");
    }

    function owner() external pure returns (address) {
        revert("Not implemented");
    }

    function balanceOf(address) external pure returns (uint256) {
        revert("Not implemented");
    }

    function mint(address, uint256) external pure {
        revert("Not implemented");
    }

    function burn(uint256) external pure {
        revert("Not implemented");
    }
}
