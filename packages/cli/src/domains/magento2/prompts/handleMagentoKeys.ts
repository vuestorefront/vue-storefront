import { password, isCancel } from '@clack/prompts';
import { logSimpleWarningMessage } from '../functions/terminalHelpers';
import { t } from 'i18next';

/** The answers expected in the form of 'inquirer'. */
type MagentoKeys = {
  accessKey: string;
  secretKey: string;
};

/** Handle input for Magento 2 access keys */
const handleMagentoKeys = async (): Promise<MagentoKeys> => {
  const accessKey = await password({
    message: t('command.generate_store.magento.access_key')
  });

  const secretKey = await password({
    message: t('command.generate_store.magento.secret_key')
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
