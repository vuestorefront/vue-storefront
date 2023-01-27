// import { t } from 'i18next';
import inquirer from 'inquirer';

/** The answers expected in the form of 'inquirer'. */
type Answers = 'Yes' | 'No';

/** Gets a git repository URL from user's input. */
const isGenerateSampleData = async (message: string): Promise<string> => {
  const { isGenerate } = await inquirer.prompt<{ isGenerate: Answers}>({
    message,
    type: 'list',
    name: 'isGenerate',
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

  return isGenerate;
};

export default isGenerateSampleData;
