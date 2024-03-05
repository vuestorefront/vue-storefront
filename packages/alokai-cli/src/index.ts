#!/usr/bin/env node

import { Command } from "commander";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  spin,
  intro,
  print,
  colors,
} from "../node_modules/@alokai/cli-ui/dist/index.js";

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

      intro();
    //   print("Example standard message");
    //   print.info("Example info message");
    //   print.success("Example success message");
    //   print.warning("Example warning message");
    //   print.error("Example error message");

    //   print.highlight("Example highlight message standard");
    //   print.highlight("Example highlight message with one **word**");
    //   print.highlight(
    //     "Example highlight message with **multiple** - **words**"
    //   );
    //   print.link("Example link %link% message", "https://www.alokai.io");
    //   print.stepper([
    //     "Step 1",
    //     "Step 2",
    //     "Step 3",
    //     "Step 4",
    //     "Step 5",
    //     "Step 6",
    //   ]);
    //   print.stepper(
    //     ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"],
    //     "numbers"
    //   );
    //   print.stepper(
    //     ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"],
    //     "dashes"
    //   );

    //   print.info(`${colors.emojis.rocket} Example emoji message`);

    //   print.debug("Example debug title", {
    //     key: "value",
    //     key2: "value2",
    //   });

      // const spinner = spin();

      // spinner.start("Starting Alokai CLI Spinner");

      // setTimeout(() => {
      //   spinner.succeed("Alokai CLI Spinner Succeeded");
      // }, 15000);
    });

  // Load command modules
  loadCommandModules(program, __dirname);

  program.parse();
}

main();
