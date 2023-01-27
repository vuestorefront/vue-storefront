// import { t } from 'i18next';
import inquirer from 'inquirer';

/** The answers expected in the form of 'inquirer'. */
type Answer = {
  magentoDomainName: string;
}

/** Gets a git repository URL from user's input. */
const getMagentoDomainName = async (message: string): Promise<string> => {
  const { magentoDomainName } = await inquirer.prompt<Answer>({
    message,
    type: 'input',
    name: 'magentoDomainName',
    default: 'magento.test'
  });

  return magentoDomainName;
};

export default getMagentoDomainName;
