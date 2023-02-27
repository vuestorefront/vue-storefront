import { password, isCancel } from '@clack/prompts';
import { logSimpleWarningMessage } from './terminalHelpers';
import { t } from 'i18next';

/** The answers expected in the form of 'inquirer'. */
type MagentoKeys = {
  accessKey: string;
  secretKey: string;
};

/** Gets a git repository URL from user's input. */
const handleMagentoKeys = async (): Promise<MagentoKeys> => {
  const accessKey = await password({
    message: 'Magento access key'
  });

  const secretKey = await password({
    message: 'Magento secret key'
  });

  if (isCancel(accessKey || secretKey)) {
    logSimpleWarningMessage(t('command.generate_store.message.canceled'));
    process.exit(0);
  }

  return {
    accessKey: accessKey as string,
    secretKey: secretKey as string
  };
};

export default handleMagentoKeys;
