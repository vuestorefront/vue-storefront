import picocolors from "picocolors";
import { confirm, isCancel } from "@clack/prompts";
import { isCloseEnough } from "./isCloseEnough";
import { log } from "../log";

interface Command {
  command: string;
  Func: any;
}

interface CheckCommandAndSuggest {
  commands: Command[];
  commandArg: string;
  endpoint: string;
  self: any;
}

// eslint-disable-next-line consistent-return
export const checkCommandAndSuggest = async ({
  commands,
  commandArg,
  endpoint,
  self,
}: CheckCommandAndSuggest) => {
  const similarCommand = commands.find(({ command }) =>
    isCloseEnough(commandArg, command)
  );

  if (similarCommand) {
    const { command, Func } = similarCommand;

    log(
      `Command ${picocolors.cyan("add")} ${picocolors.yellow(
        commandArg
      )} does not exist. Did you mean ${picocolors.cyan(
        "add"
      )} ${picocolors.green(command)}?`
    );

    const shouldRunNewCommand = await confirm({
      message: `Do you want to run ${picocolors.green(command)} command?`,
    });

    if (isCancel(shouldRunNewCommand) || !shouldRunNewCommand) {
      log("Command was not created \nSee you next time!");
      process.exit(0);
    }

    if (shouldRunNewCommand) {
      const newCommand = new Func([endpoint], self.config);

      return newCommand.run();
    }
  }

  log(
    `Command ${picocolors.yellow(commandArg)} does not exist \n\nCommand list:`
  );
  commands.forEach(({ command }) =>
    log(`- ${picocolors.cyan("add")} ${picocolors.green(command)}`)
  );
  process.exit(0);
};
