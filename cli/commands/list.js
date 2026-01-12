import fs from "fs";
import path from "path";
import chalk from "chalk";

export default async function list() {
  const VAULT_PATH = path.join(process.cwd(), "vault.json");

  if (!fs.existsSync(VAULT_PATH)) {
    console.log(chalk.red("❌ Vault not initialized : Run init command first"));
    return;
  }

  const vault = JSON.parse(fs.readFileSync(VAULT_PATH, "utf-8"));
  const n = vault.entries.length;

  let a = [];
  for (let i = 0; i < n; i++) {
    if (!a.includes(vault.entries[i].name)) {
      a.push(vault.entries[i].name);
    }
  }
  const m = a.length;

  if (m === 0) {
    console.log(chalk.yellow("⚠️ No entries found in the vault"));
    return;
  }

  console.log(chalk.bold.cyan(`\n🔐 Vault Services (${m}):\n`));

  for (let i = 0; i < m; i++) {
    console.log(
      `${chalk.yellow(i + 1)}. ${chalk.green.bold(a[i])}`
    );
    console.log(chalk.gray("──────────────────────────────\n"));
  }
}

