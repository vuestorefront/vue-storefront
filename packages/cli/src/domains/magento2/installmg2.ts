// import { t } from 'i18next';
import inquirer from 'inquirer';

/** The answers expected in the form of 'inquirer'. */
type Answers = 'Yes' | 'No';

/** Gets a git repository URL from user's input. */
const isInstallMagento = async (message: string): Promise<string> => {
  const { isInstallMagento } = await inquirer.prompt<{ isInstallMagento: Answers}>({
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
    ],
    default: 'Yes'
  });

  return isInstallMagento;
};

export default isInstallMagento;
