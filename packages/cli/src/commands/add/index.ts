import { Command } from "@oclif/core";
import picocolors from "picocolors";
import AddEndpoint from "./endpoint";
import { checkCommandAndSuggest, log } from "../../utils";

const EXISTING_COMMANDS = [
  {
    command: "endpoint",
    Func: AddEndpoint,
  },
];

export default class Add extends Command {
  static override description = "Create new endpoint boilerplate code";

  static override examples = ["@vue-storefront/cli add <command> <endpoint>"];

  static override flags = {};

  static override args = [
    {
      name: "commandArg",
      description: "Name of the command",
    },
    {
      name: "endpoint",
      description: "Name of the endpoint",
    },
  ];

  async run(): Promise<void> {
    const { args } = await this.parse(Add);
    const { commandArg, endpoint } = args;

    await checkCommandAndSuggest({
      commands: EXISTING_COMMANDS,
      commandArg,
      endpoint,
      self: this,
    });

    log(
      `Command ${picocolors.green(
        "add"
      )} require additional arguments. Please run ${picocolors.green(
        "@vue-storefront/cli add --help"
      )} to see available options.\n`
    );

    process.exit(0);
  }
}
