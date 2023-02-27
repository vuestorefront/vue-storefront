// import { t } from 'i18next';
import fs from 'fs';
import {
  logSimpleInfoMessage,
  logSimpleWarningMessage
} from './terminalHelpers';
import { confirm, isCancel } from '@clack/prompts';
import { t } from 'i18next';

/** The answers expected in the form of 'inquirer'. */
type Arguments = {
  message: string;
  magentoDirName: string;
};

/** Gets a git repository URL from user's input. */
const confirmOverwrite = async ({
  message,
  magentoDirName
}: Arguments): Promise<boolean | symbol> => {
  const overwrite = await confirm({
    message
  });

  if (isCancel(overwrite)) {
    logSimpleWarningMessage(t('command.generate_store.message.canceled'));
    process.exit(0);
  }

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

  return overwrite;
};

export default confirmOverwrite;
