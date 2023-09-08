import { Command, Flags } from "@oclif/core";
import picocolors from "picocolors";
import { checkCommandAndQuit, log } from "../../utils";

const EXISTING_COMMANDS = ["integration"];

export default class Create extends Command {
  static override description = "Generate integration boilerplate";

  static override examples = ["<%= config.bin %> <%= command.id %>"];

  static override flags = {
    framework: Flags.string({
      char: "t",
      description: "Framework to use",
      options: ["nuxt", "next"],
      aliases: ["template"],
    }),
  };

  static override args = [
    {
      name: "commandName",
    },
    {
      name: "integrationName",
    },
  ];

  async run(): Promise<void> {
    const { args } = await this.parse(Create);
    const { commandName } = args;

    checkCommandAndQuit({
      commands: EXISTING_COMMANDS,
      commandName,
    });

    log(
      `Command ${picocolors.green(
        "create"
      )} require additional arguments. Please run ${picocolors.green(
        "@vue-storefront/cli create --help"
      )} to see available options.\n`
    );

    process.exit(0);
  }
}
