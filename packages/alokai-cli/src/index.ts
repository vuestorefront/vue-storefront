#!/usr/bin/env node

import { Command } from "commander";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

// Function to import and initialize command modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nodeModulesPath = path.join(__dirname, "..", "node_modules");

// Function to import and initialize command modules
const loadCommandModules = (program, dir) => {
  fs.readdirSync(nodeModulesPath).forEach(async (moduleName) => {
    try {
      if (moduleName.startsWith("alokai-")) {
        try {
          // Construct the full path to the module
          const modulePath = path.join(nodeModulesPath, moduleName);

          // Dynamically import the command module
          const commandModule = await import(
            `file://${modulePath}/dist/index.js`
          );
          // Initialize the command module with the Commander instance
          if (typeof commandModule.default === "function") {
            commandModule.default(program);
          } else {
            console.warn(
              `Module ${moduleName} does not export a default function and was not loaded.`
            );
          }
        } catch (error) {
          console.error(`Error loading module ${moduleName}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error loading module ${moduleName}:`, error);
    }
  });
};

async function main() {
  const program = new Command()
    .name("Alokai CLI")
    .description("Alokai CLI is a tool to help you manage your Alokai projects")
    .version("0.0.1", "-v, --version", "display the version number")
    .action(() => {
      // Load command modules
      loadCommandModules(program, __dirname);

      program.parse();
    });
}

main();
