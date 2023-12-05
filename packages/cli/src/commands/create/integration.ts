import { Command, Flags } from "@oclif/core";
import { intro, spinner } from "@clack/prompts";
import execa from "execa";
import picocolors from "picocolors";
import { createIntegrationBoilerplate } from "../../domains/create/integration";
import { getPkgManager, log } from "../../utils";
import {
  handleDirectoryName,
  handleFrameworkName,
  installAppSdkDependencies,
  cleanUpRepositories,
} from "../../domains/create/integration/helpers";

export default class GenerateSDK extends Command {
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
      name: "name",
    },
  ];

  async run(): Promise<void> {
    let projectDir = "";
    let framework = "";
    const sp = spinner();

    const { flags } = await this.parse(GenerateSDK);
    if (flags.framework) {
      framework = flags.framework;
    }
    const { args } = await this.parse(GenerateSDK);
    // eslint-disable-next-line dot-notation
    if (args["name"]) {
      // eslint-disable-next-line dot-notation
      projectDir = args["name"];
    }
    // greet the user
    intro("Welcome to Vue Storefront SDK Integration Boilerplate Generator!");

    projectDir = await handleDirectoryName(projectDir);
    framework = await handleFrameworkName(framework);
    const packageManager = await getPkgManager();

    await createIntegrationBoilerplate({ projectDir, framework });
    await installAppSdkDependencies(projectDir, packageManager);

    // build the boilerplate
    sp.start("Building the boilerplate");
    const cliDir = `${projectDir}/cli`;
    await execa(packageManager, ["run", "build"], { cwd: projectDir });
    await execa(packageManager, ["run", "build"], { cwd: cliDir });
    sp.stop("Boilerplate has been built successfully!");
    // clean up the git repository
    await cleanUpRepositories(projectDir);

    // exit the generator
    log("SDK integration boilerplate has been generated successfully!");
    log("To start the development, run the following commands:");
    log(picocolors.green(`cd ${projectDir}`));
    log(
      picocolors.green(
        `${packageManager === "yarn" ? "yarn dev" : "npm run dev"}`
      )
    );
    process.exit(0);
  }
}
