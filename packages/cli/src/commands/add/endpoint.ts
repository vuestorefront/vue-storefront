import { Command } from "@oclif/core";
import { existsDirectory, log } from "../../utils";
import { makeMethod } from "../../domains/add/endpoint";
import { endpointName } from "../../domains/add/endpoint/helpers";

export default class AddEndpoint extends Command {
  static override description = "Create new endpoint boilerplate code";

  static override examples = ["<%= config.bin %> <%= command.id %>"];

  static override flags = {};

  static override args = [
    {
      name: "name",
      description: "Name of the endpoint",
    },
  ];

  async run(): Promise<void> {
    const { args } = await this.parse(AddEndpoint);
    let { name } = args;

    if (!name) {
      name = await endpointName();
    }

    // check if folder packages and playground exists in the current directory
    const isPackagesDirExists = await existsDirectory("packages");
    const isPlaygroundDirExists = await existsDirectory("playground");

    if (isPackagesDirExists && isPlaygroundDirExists) {
      await makeMethod(name);
    } else {
      log(
        "Please run this command in the root directory of the SDK Integration Boilerplate!"
      );
    }

    process.exit(0);
  }
}
