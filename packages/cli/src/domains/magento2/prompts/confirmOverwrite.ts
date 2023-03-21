import fs from 'fs';
import {
  logSimpleInfoMessage,
  logSimpleWarningMessage
} from '../functions/terminalHelpers';
import { confirm, isCancel, spinner } from '@clack/prompts';
import { t } from 'i18next';
import picocolors from 'picocolors';

/** The answers expected in the form of 'inquirer'. */
type Arguments = {
  message: string;
  magentoDirName: string;
};

/** Prompts user if they want to overwrite the directory */
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

  const sp = spinner();

  if (overwrite) {
    sp.start(
      picocolors.cyan(t('command.generate_store.progress.delete_start'))
    );
    await fs.rmSync(magentoDirName, { recursive: true, force: true });
    await fs.mkdirSync(magentoDirName);
    sp.stop(picocolors.green(t('command.generate_store.progress.delete_end')));
  }

  if (!overwrite) {
    logSimpleInfoMessage(t('command.generate_store.progress.create_dir'));
    fs.mkdirSync(magentoDirName + '-new');
  }

  return overwrite;
};

export default confirmOverwrite;
