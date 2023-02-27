import { t } from 'i18next';
import { confirm, isCancel } from '@clack/prompts';
import { logSimpleWarningMessage } from './terminalHelpers';

/** Gets a git repository URL from user's input. */
const isMagentoKeys = async (message: string): Promise<boolean | symbol> => {
  const hasMagentoAccessKeys = await confirm({
    message,
    initialValue: true
  });

  if (isCancel(hasMagentoAccessKeys)) {
    logSimpleWarningMessage(t('command.generate_store.message.canceled'));
    process.exit(0);
  }

  return hasMagentoAccessKeys;
};

export default isMagentoKeys;
