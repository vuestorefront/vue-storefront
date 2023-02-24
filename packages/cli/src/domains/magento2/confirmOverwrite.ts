// import { t } from 'i18next';
import inquirer from 'inquirer';
import fs from 'fs';
import { logSimpleInfoMessage } from './terminalHelpers';

/** The answers expected in the form of 'inquirer'. */
type Arguments = {
  message: string;
  magentoDirName: string;
};

/** Gets a git repository URL from user's input. */
const confirmOverwrite = async ({
  message,
  magentoDirName
}: Arguments): Promise<string> => {
  const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>({
    type: 'confirm',
    name: 'overwrite',
    message
  });

  if (overwrite) {
    logSimpleInfoMessage('Deleting the existing directory');
    fs.rmSync(magentoDirName, { recursive: true, force: true });
    fs.mkdirSync(magentoDirName);
  }

  // eslint-disable-next-line max-depth
  if (!overwrite) {
    logSimpleInfoMessage('Creating a new directory');
    fs.mkdirSync(magentoDirName + '-new');
  }

  return overwrite ? 'Yes' : 'No';
};

export default confirmOverwrite;
