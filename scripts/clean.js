const { rmSync } = require("node:fs");
const { resolve } = require("node:path");

const root = resolve(__dirname, "..");

const targets = [
  "node_modules",
  "package-lock.json",
  "contract/node_modules",
  "contract/package-lock.json",
  "contract/artifacts",
  "contract/cache",
  "contract/typechain",
  "contract/typechain-types",
];

for (const target of targets) {
  rmSync(resolve(root, target), { recursive: true, force: true });
  console.log("removed", target);
}
