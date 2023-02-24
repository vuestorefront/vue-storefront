// import { t } from 'i18next';
import inquirer from 'inquirer';

/** The answers expected in the form of 'inquirer'. */
type Answers = 'Yes' | 'No';

/** Prompt user if they want to install Magento 2 locally. */
const isInstallMagento = async (message: string): Promise<string> => {
  const { isInstallMagento } = await inquirer.prompt<{
    isInstallMagento: Answers;
  }>({
    message,
    type: 'list',
    name: 'isInstallMagento',
    choices: [
      {
        name: 'Yes',
        value: true
      },
      {
        name: 'No',
        value: false
      }
    ]
  });

  return isInstallMagento;
};

export default isInstallMagento;
