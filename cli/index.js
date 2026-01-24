#!/usr/bin/env node

import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import chalk from "chalk";
import init from "./commands/init.js";
import get from "./commands/get.js";
import add from "./commands/add.js";
import { render } from "./utils/render.js";
import open from "open";
import list from "./commands/list.js";
import { deleteEntry } from "./commands/delete.js";
import { drop } from "./commands/drop.js";
import checkLatestVersion from "./utils/newVersion.js";


await checkLatestVersion();

const rl = readline.createInterface({ input, output });

console.log(`
 _____ _____ _   _ _____ _____ _   _  _____ _     
/  ___|  ___| \\ | |_   _|_   _| \\ | ||  ___| |    
\\ \`--.| |__ |  \\| | | |   | | |  \\| || |__ | |    
 \`--. \\  __|| . \` | | |   | | | . \` ||  __|| |    
/\\__/ / |___| |\\  | | |  _| |_| |\\  || |___| |____
\\____/\\____/\\_| \\_/ \\_/  \\___/\\_| \\_/\\____/\\_____/
`);


console.log(`${chalk.red(`type help to get a list of commands\n`)}`);

async function main() {
  while (true) {
    const cmd = (await rl.question(">>>")).trim();
    const parts = cmd.split(" ");
    const command = parts[0];

    if (command === "exit") {
      break;
    }

    if (command === "help") {
      render();
      console.log(`
${chalk.bold.cyan("Commands:")}

  ${chalk.green("init")}    initialize vault
  ${chalk.yellow("add")}     add a password
  ${chalk.blue("list")}    list services
  ${chalk.magenta("get")}     get a password
  ${chalk.bgBlue("delete")}  deletes a specific entry
  ${chalk.bgRedBright("drop")} Deletes the whole Vault
  ${chalk.red("exit")}    quit

  ${chalk.whiteBright("clear")}   to clear the terminal window.

${chalk.bold.yellow("Do you want to contribute or suggest features?")}
  type ${chalk.bold.green("github")} or ${chalk.bold.green("repo")}
  
  `);
      continue;
    }

    if (command == "init") {
      await init(rl);
      continue;
    }

    if (command == "add") {
      await add(parts, rl);
      continue;
    }

    if (command == "get") {
      await get(parts, rl);
      continue;
    }

    if (command == "clear") {
      render();
      continue;
    }

    if (command === "github" || command === "repo") {
      await open("https://github.com/Abhigyan2005/PasswordManager");
      console.log("🌐 Opening GitHub repository...");
      continue;
    }

    if (command == "list") {
      await list(parts, rl);
      continue;
    }

    if (command == "delete") {
      await deleteEntry(rl, parts);
      continue;
    }

    if (command == "drop") {
      await drop(rl);
      continue;
    }

    console.log(`${chalk.red(`Unknown Command\n`)}`);
  }

  rl.close();
}

main();
