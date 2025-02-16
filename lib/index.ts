#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import fs from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const program = new Command();
const __dirname = dirname(fileURLToPath(import.meta.url));

program
  .version("1.0.0")
  .description("Configure Project to use Fission UI")
  .command("init")
  .action(addComponent);

program.parse(process.argv);

//add files
export default function addComponent() {
  const sourcePath = resolve(__dirname, "./components/Button.tsx");
  const destinationPath = resolve(process.cwd(), "./src/Button.tsx");

  fs.copyFileSync(sourcePath, destinationPath);

  console.log(chalk.green(`File copied to: ${destinationPath}`));
}
