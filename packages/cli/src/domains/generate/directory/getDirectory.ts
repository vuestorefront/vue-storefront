import * as path from "path";
import { t } from "i18next";
import inquirer from "inquirer";
import existsDirectory from "./existsDirectory";

type Answers = {
  directory: string;
};

/** Gets a directory from user input. */
const getDirectory = async (message: string): Promise<string> => {
  const answers = await inquirer.prompt<Answers>({
    message,
    name: "directory",
    type: "input",
    default: "./",
    validate: async (directory): Promise<string | true> => {
      const exists = await existsDirectory(path.resolve(directory));

      if (!exists) {
        return t<string>("domain.directory.was_not_found", {
          directory,
        });
      }

      return true;
    },
  });

  return path.resolve(answers.directory);
};

export default getDirectory;
