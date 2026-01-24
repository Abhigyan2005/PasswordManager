import chalk from "chalk";

export function render() {
  process.stdout.write("\x1Bc"); //since console.clear only clears the visible part of the console.
  console.log(`
 _____ _____ _   _ _____ _____ _   _  _____ _     
/  ___|  ___| \\ | |_   _|_   _| \\ | ||  ___| |    
\\ \`--.| |__ |  \\| | | |   | | |  \\| || |__ | |    
 \`--. \\  __|| . \` | | |   | | | . \` ||  __|| |    
/\\__/ / |___| |\\  | | |  _| |_| |\\  || |___| |____
\\____/\\____/\\_| \\_/ \\_/  \\___/\\_| \\_/\\____/\\_____/
`);

  console.log(`${chalk.red(`type help to get a list of commands\n`)}`);
}
