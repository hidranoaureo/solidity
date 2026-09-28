# Skill Test: TestToken (60–90 minutes)

Implement a Solidity token so the provided Hardhat tests pass, then deploy it and point the existing Node.js API at that deploy.

The backend and the tests are already in place. Please leave them as they are — the tests are the spec.

---

## What is already in this repo

| Piece | Status |
| --- | --- |
| Express API (`/mint`, `/burn`, `/balance/:address`, `/health`) | Ready — no code changes; deploy the contract and set `.env` to connect it |
| Hardhat project, compile/deploy scripts | Ready |
| Contract tests in [`contract/test/TestToken.ts`](./contract/test/TestToken.ts) | Ready — please leave this file as-is |
| [`contract/contracts/TestToken.sol`](./contract/contracts/TestToken.sol) | Stub — **this is your work** |

---

## Your task

### 1. Implement `TestToken`

Work in [`contract`](./contract). Replace the stub in `contract/contracts/TestToken.sol`. Keep the contract name `TestToken`.

| Item | Value |
| --- | --- |
| Name | `TestToken` |
| Symbol | `STT` |
| Decimals | `18` |
| Solidity | `^0.8.20` |
| Access control | OpenZeppelin `Ownable` (deployer is owner) |
| Token standard | OpenZeppelin `ERC20` + `ERC20Burnable` |

| Function | Behavior |
| --- | --- |
| constructor | Mint **1000** tokens to the deployer (`1000 * 10**18`) |
| `mint(address to, uint256 amount)` | Owner only. Mints `amount` to `to`. |
| `burn(uint256 amount)` | Caller burns `amount` from their own balance. |
| `balanceOf(address account)` | Token balance of `account`. |
| `name()` / `symbol()` / `decimals()` / `owner()` | As in the table above. |

Amounts in the API are whole tokens. The contract uses 18 decimals, so 1 token is `1e18` base units. The backend already converts with `decimals()`.

```bash
cd contract
npm install
npm test
```

The stub fails all 7 tests on purpose. Once `npm test` is green, move on to deploy and connect the API.

### 2. Deploy and connect the backend

The Express app is already written. Deploy the contract and set `.env` so `/mint`, `/burn`, and `/balance/:address` hit your token.

Terminal 1 — Hardhat chain (not the Express server):

```bash
cd contract
npm run chain
```

Terminal 2:

```bash
cd contract
npm run deploy
```

Copy the printed address into the repo-root `.env` as `CONTRACT_ADDRESS`. Use the Hardhat account #0 key from [`.env.example`](./.env.example) (development only).

```bash
npm install
cp .env.example .env
npm start
```

`GET http://localhost:4972/health` → `{ "status": "OK" }`

| Method | Path | Body / params |
| --- | --- | --- |
| `POST` | `/mint` | `{ "to": "0x…", "amount": 50 }` |
| `POST` | `/burn` | `{ "amount": 20 }` — burns from the backend wallet |
| `GET` | `/balance/:address` | — |

Sepolia is extra for this exercise, not part of the main path.

---

## How we evaluate

1. `contract` tests pass without edits to `test/TestToken.ts`.
2. `mint` is owner-only; `burn` spends the caller’s balance; initial supply is 1000 tokens to the deployer.
3. OpenZeppelin is used as specified, rather than a from-scratch ERC-20, unless there is a clear reason.
4. The backend is running against your deploy: `/health` is OK, and `/mint`, `/burn`, and `/balance/:address` work.

We look at your deploy plus the provided API. Sepolia is extra.
