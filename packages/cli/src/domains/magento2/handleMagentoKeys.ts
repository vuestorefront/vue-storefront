// import { t } from 'i18next';
import inquirer from 'inquirer';

/** The answers expected in the form of 'inquirer'. */
type MagentoKeys = {
  accessKey: string;
  secretKey: string;
}

/** Gets a git repository URL from user's input. */
const handleMagentoKeys = async (message: string): Promise<MagentoKeys> => {
  const { accessKey, secretKey } = await inquirer.prompt<MagentoKeys>([
    {
      message,
      type: 'input',
      name: 'accessKey'
    },
    {
      message: 'Magento secret key',
      type: 'input',
      name: 'secretKey'
    }
  ]);

  return {
    accessKey,
    secretKey
  };
};

export default handleMagentoKeys;
