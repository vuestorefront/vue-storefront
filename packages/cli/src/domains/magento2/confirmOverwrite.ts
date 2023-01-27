// import { t } from 'i18next';
import inquirer from 'inquirer';
import fs from 'fs';

/** The answers expected in the form of 'inquirer'. */
type Arguments = {
  message: string;
  magentoDirName: string;
  self: any;
};

/** Gets a git repository URL from user's input. */
const confirmOverwrite = async ({ message, magentoDirName, self }: Arguments): Promise<string> => {
  const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>({
    type: 'confirm',
    name: 'overwrite',
    message
  });

  if (overwrite) {
    self.log('Deleting the existing directory');
    fs.rmSync(magentoDirName, { recursive: true, force: true });
    fs.mkdirSync(magentoDirName);
  }

  // eslint-disable-next-line max-depth
  if (!overwrite) {
    self.log('Creating a new directory');
    fs.mkdirSync(magentoDirName + '-new');
  }

  return overwrite ? 'Yes' : 'No';
};

export default confirmOverwrite;
