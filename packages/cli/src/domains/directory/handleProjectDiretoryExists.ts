import fs from 'fs';
import { confirm, isCancel } from '@clack/prompts';
import existsDirectory from './existsDirectory';
import {
  logSimpleErrorMessage,
  logSimpleWarningMessage
} from '../magento2/functions/terminalHelpers';
import { t } from 'i18next';
import picocolors from 'picocolors';

export const handleProjectDiretoryExists = async ({
  projectName,
  projectDir,
  sp
}: {
  projectName: string;
  projectDir: string;
  sp: any;
}): Promise<void> => {
  if (await existsDirectory(projectDir)) {
    const overwrite = await confirm({
      message: t('command.generate_store.input.overwrite', {
        projectName
      }) as string
    });
    if (isCancel(overwrite)) {
      logSimpleWarningMessage(t('command.generate_store.message.canceled'));
      process.exit(0);
    }

    if (overwrite) {
      sp.start(
        picocolors.cyan(t('command.generate_store.progress.delete_start'))
      );
      await fs.rmSync(projectDir, { recursive: true, force: true });
      await fs.mkdirSync(projectDir);
      sp.stop(
        picocolors.green(t('command.generate_store.progress.delete_end'))
      );
    }

    if (!overwrite) {
      logSimpleErrorMessage(t('command.generate_store.message.skipping'));
      process.exit(0);
    }
  }
};
