import { t } from 'i18next';
import { confirm, isCancel } from '@clack/prompts';
import { logSimpleWarningMessage } from './terminalHelpers';

/** Gets a git repository URL from user's input. */
const isGenerateSampleData = async (message: string): Promise<boolean> => {
  const isGenerate = await confirm({
    message,
    initialValue: true
  });

  if (isCancel(isGenerate)) {
    logSimpleWarningMessage(t('command.generate_store.message.canceled'));
    process.exit(0);
  }

  return isGenerate as boolean;
};

export default isGenerateSampleData;
