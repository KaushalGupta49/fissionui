#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import fs from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "child_process";

const program = new Command();
const __dirname = dirname(fileURLToPath(import.meta.url));
const missingDeps: string[] = [];

program.version("1.0.0").description("Fission UI - CLI tool");

program
  .command("init")
  .description("Configure Project to use Fission UI")
  .action(init);

program
  .command("add")
  .description("Add Component to Project")
  .action(addComponent);

program.parse(process.argv);

// Initialize the project
function init() {
  console.log(chalk.blue("Initializing Fission UI in Project..."));
  checkDependencies(["react", "cva", "tailwindcss"]);
  if (missingDeps.length > 0) {
    installDependencies();
  }
}

// Add components as per name
function addComponent() {
  const sourcePath = resolve(__dirname, "./components/Button.tsx");
  const destinationPath = resolve(process.cwd(), "./src/Button.tsx");

  try {
    fs.copyFileSync(sourcePath, destinationPath);
    console.log(chalk.green(`File copied to: ${destinationPath}`));
  } catch (error) {
    console.error(chalk.red(`Error copying file: ${error.message}`));
  }
}

function checkDependencies(dependencies: string[]) {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const installedDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  dependencies.forEach((dep: string) => {
    if (installedDeps[dep]) {
      console.log(`✅ ${dep} is installed`);
    } else {
      console.log(`❌ ${dep} is NOT installed`);
      missingDeps.push(dep);
    }
  });
}

function installDependencies() {
  console.log(
    `\nInstalling missing dependencies: ${missingDeps.join(", ")}...\n`
  );
  execSync(`npm install ${missingDeps.join(" ")}`, { stdio: "inherit" });
  console.log("\n✅ All dependencies are now installed!");
  missingDeps.length = 0;
}
