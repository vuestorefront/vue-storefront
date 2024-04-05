import { Command } from "commander";
import alokaiCliStorefront from "alokai-cli-storefront";

async function main() {
  const program = new Command()
    .name("alokai")
    .description("Alokai CLI is a tool to help you manage your Alokai projects")
    .usage("[command] [options]")
    .version("0.0.1", "-v, --version", "display the version number")
    .action(() => {
      program.help();
    });

  alokaiCliStorefront.forEach((command) => {
    program.addCommand(command);
  });

  program.parse();
}

main();
