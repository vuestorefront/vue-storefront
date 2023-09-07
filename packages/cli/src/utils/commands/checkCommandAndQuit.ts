import picocolors from "picocolors";
import { isCloseEnough } from "./isCloseEnough";
import { log } from "../log";

interface CheckCommandAndQuit {
  commands: string[];
  commandName: string;
}

export const checkCommandAndQuit = async ({
  commands,
  commandName,
}: CheckCommandAndQuit) => {
  const similarCommand = commands.find((command) =>
    isCloseEnough(commandName, command)
  );

  if (similarCommand) {
    log(
      `Command ${picocolors.cyan("create")} ${picocolors.yellow(
        commandName
      )} does not exist. Did you mean ${picocolors.cyan(
        "create"
      )} ${picocolors.green(similarCommand)}?`
    );
    process.exit(0);
  }

  log(
    `Command ${picocolors.yellow(commandName)} does not exist \n\nCommand list:`
  );
  commands.forEach((command) =>
    log(`- ${picocolors.cyan("create")} ${picocolors.green(command)}`)
  );
  process.exit(0);
};
