// import { t } from 'i18next';
import inquirer from 'inquirer';

/** The answers expected in the form of 'inquirer'. */
type MagentoKeys = {
  accessKey: string;
  secretKey: string;
};

/** Gets a git repository URL from user's input. */
const handleMagentoKeys = async (): Promise<MagentoKeys> => {
  const { accessKey, secretKey } = await inquirer.prompt<MagentoKeys>([
    {
      message: 'Magento access key',
      type: 'password',
      name: 'accessKey'
    },
    {
      message: 'Magento secret key',
      type: 'password',
      name: 'secretKey'
    }
  ]);

  return {
    accessKey,
    secretKey
  };
};

export default handleMagentoKeys;
