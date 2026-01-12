import path from "path";
import fs from "fs";
import crypto from "crypto";
import chalk from "chalk";
import { questionMask } from "../utils/mask.js";

export default async function add(parts, rl) {
  const VAULT_PATH = path.join(process.cwd(), "vault.json");

  if (!fs.existsSync(VAULT_PATH)) {
    console.log("Vault not initizalized : Run init command first");
    return;
  }

  if (parts.length < 3) {
    console.log(`   ${chalk.red(`Usage:`)} add <service> <username>\n`);
    return;
  }

  const [, service, username] = parts; // first , means skip first element.

  const password = await questionMask(rl, "Password: ");

  if (!password) {
    console.log("password cannot be empty");
  }

  const vault = JSON.parse(fs.readFileSync(VAULT_PATH, "utf-8"));

  const salt = vault.salt;

  for (let i = 3; i > 0; i--) {
    const a = await questionMask(rl, "Enter Master Password: ");
    const hash = crypto
      .pbkdf2Sync(a, salt, 100000, 32, "sha256")
      .toString("hex");

    if (vault.hash != hash) {
      let attempt_left = i - 1;
      console.log(chalk.red.bold(`❌  Wrong Password!  (${attempt_left} tries left)`));
      if (attempt_left == 0) {
        return;
      }
      continue;
    } else {
      break;
    }
  }

  vault.entries.push({
    name: service,
    username,
    password,
  });

  fs.writeFileSync(VAULT_PATH, JSON.stringify(vault, null, 2));

  console.log(`added password for gmail for your username : ${username}`);
}
