import path from "path";
import fs from "fs";
import crypto from "crypto";
import { questionMask } from "../utils/mask.js";

export default async function add(parts, rl) {
  const VAULT_PATH = path.join(process.cwd(), "vault.json");

  if (!fs.existsSync(VAULT_PATH)) {
    console.log("Vault not initizalized : Run init command first");
    return;
  }

  if (parts.length < 3) {
    console.log(" Usage: add <service> <username>");
    return;
  }

  const [, service, username] = parts; // first , means skip first element.

  const password = await questionMask(rl, "Password: ");

  if (!password) {
    console.log("password cannot be empty");
  }

  const vault = JSON.parse(fs.readFileSync(VAULT_PATH, "utf-8"));

  const a = await questionMask(rl, "Enter Master Password: ");
  const salt = vault.salt;
  const hash = crypto.pbkdf2Sync(a, salt, 100000, 32, "sha256").toString("hex");

  if (vault.hash != hash) {
    console.log("password does not match");
    return;
  }
  vault.entries.push({
    name: service,
    username,
    password,
  });

  fs.writeFileSync(VAULT_PATH, JSON.stringify(vault, null, 2));

  console.log(`added password for gmail for your username : ${username}`);
}
