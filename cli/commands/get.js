import fs from "fs";
import path from "path";
import crypto from "crypto";
import { questionMask } from "../utils/mask.js";

export default async function get(parts, rl) {
  const VAULT_PATH = path.join(process.cwd(), "vault.json");

  if (!fs.existsSync(VAULT_PATH)) {
    console.log("Vault not initizalized : Run init command first");
    return;
  }

  if (parts.length < 2) {
    console.log(" Usage: get <service>");
    return;
  }

  const [, service] = parts;

  const vault = JSON.parse(fs.readFileSync(VAULT_PATH, "utf-8"));

  const a = await questionMask(rl, "Enter Master Password: ");
  const salt = vault.salt;
  const hash = crypto.pbkdf2Sync(a, salt, 100000, 32, "sha256").toString("hex");

  if (vault.hash != hash) {
    console.log("master password is incorrect");
    return;
  }

  const b = vault.entries.filter((e) => e.name === service);
  const result = b.map((e) => ({
    username: e.username,
    password: e.password,
  }));

  if (result.length === 0) {
    console.log("No entry found");
    return;
  }

  for (const e of result) {
    console.log(
      "--------------------------------------------------------------"
    );
    console.log(`Username: ${e.username}`);
    console.log(`Password: ${e.password}`);
    console.log(
      "--------------------------------------------------------------"
    );
  }
}
