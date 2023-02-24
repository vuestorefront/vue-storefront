import { t } from 'i18next';
import inquirer from 'inquirer';

/** The answers expected in the form of 'inquirer'. */
type Answer = {
  magentoDomainName: string;
};

/** Gets a Magento domain name and checks for validity. */
const getMagentoDomainName = async (message: string): Promise<string> => {
  const { magentoDomainName } = await inquirer.prompt<Answer>({
    message,
    type: 'input',
    name: 'magentoDomainName',
    default: 'magento.test',
    validate(value: string) {
      if (!value?.trim()) {
        return t<string>('domain.project_name.is_empty');
      }

      const domainNameRegex =
        /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/;

      if (!domainNameRegex.test(value)) {
        return 'Please enter a valid domain name';
      }

      return true;
    }
  });

  return magentoDomainName;
};

export default getMagentoDomainName;
