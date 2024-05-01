import path from "path";
import fs from "fs";

// check if src/index.ts exists and delete it if it does
const srcIndexPath = path.join(process.cwd(), "src", "index.ts");
if (fs.existsSync(srcIndexPath)) {
  fs.unlinkSync(srcIndexPath);
}

const nodeModulesPath = path.join(process.cwd(), "node_modules");
const modules = [];
// Function to import and initialize command modules
(() => {
  fs.readdirSync(nodeModulesPath).forEach(async (moduleName) => {
    try {
      if (moduleName.startsWith("alokai-") && moduleName !== "alokai-cli-ui") {
        // turn moduleName into camelCase
        const camelCaseModuleName = moduleName
          .split("-")
          .map((word, index) =>
            index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join("");

        modules.push({
          name: moduleName,
          camelCaseName: camelCaseModuleName,
        });
      }
    } catch (error) {
      console.error(`Error loading module ${moduleName}:`, error);
    }
  });
})();

// Write the src/index.ts file
const indexFile = `#!/usr/bin/env node

import { Command } from "commander";
${modules.map((module) => `import ${module.camelCaseName} from "${module.name}";`).join("\n")}

async function main() {
  const program = new Command()
    .name("alokai")
    .description("Alokai CLI is a tool to help you manage your Alokai projects")
    .usage("[command] [options]")
    .version("0.0.1", "-v, --version", "display the version number")
    .action(() => {
      program.help();
    });

  ${modules.map((module) => `${module.camelCaseName}.forEach((command) => {
    program.addCommand(command);
  });`).join("\n  ")}

  program.parse();
}

main();
`;

// create the src directory if it doesn't exist
if (!fs.existsSync(path.join(process.cwd(), "src"))) {
  fs.mkdirSync(path.join(process.cwd(), "src"));
}

fs.writeFileSync(srcIndexPath, indexFile);




