import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import chalk from "chalk";
import init from "./commands/init.js";
const rl = readline.createInterface({ input, output });

console.log(chalk.bgRed((`
██████╗  █████╗ ███████╗███████╗     ██████╗ ██╗   ██╗ █████╗ ██████╗ ██████╗ 
██╔══██╗██╔══██╗██╔════╝██╔════╝    ██╔════╝ ██║   ██║██╔══██╗██╔══██╗██╔══██╗
██████╔╝███████║███████╗███████╗    ██║  ███╗██║   ██║███████║██████╔╝██║  ██║
██╔═══╝ ██╔══██║╚════██║╚════██║    ██║   ██║██║   ██║██╔══██║██╔══██╗██║  ██║
██║     ██║  ██║███████║███████║    ╚██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝     ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ 
                                                                              
`)));

console.log("type help to get a list of commands\n");

async function main() {
  while (true) {
    const cmd = (await rl.question(">> ")).trim();

    if (cmd === "exit") {
      break;
    }

    if (cmd === "help") {
      console.log(`
Commands:
  init    initialize vault
  add     add a password
  list    list entries
  get     get a password
  exit    quit
      `);
      continue;
      }
      
      if (cmd == "init") {
          await init(rl);
          continue;
      }

    console.log("unknown command");
  }

  rl.close();
}

main();