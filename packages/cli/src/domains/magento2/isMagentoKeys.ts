// import { t } from 'i18next';
import inquirer from 'inquirer';

/** The answers expected in the form of 'inquirer'. */
type Answers = 'Yes' | 'No';

/** Gets a git repository URL from user's input. */
const isMagentoKeys = async (message: string): Promise<string> => {
  const { hasMagentoAccessKeys } = await inquirer.prompt<{ hasMagentoAccessKeys: Answers }>({
    message,
    type: 'list',
    name: 'hasMagentoAccessKeys',
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

  return hasMagentoAccessKeys;
};

export default isMagentoKeys;
