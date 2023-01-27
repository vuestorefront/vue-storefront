import { t } from 'i18next';
import inquirer from 'inquirer';
import isReasonableFilename from 'reasonable-filename';
import formatToProjectName from '../project-name/formatToProjectName';
import { checkExistingDockerContainers } from './docker';

/** The answers expected in the form of 'inquirer'. */
type Answer = {
  magentoDirName: string;
}

/** Gets a git repository URL from user's input. */
const getMagentoDirName = async (message: string): Promise<string> => {
  const { magentoDirName } = await inquirer.prompt<Answer>({
    message,
    type: 'input',
    name: 'magentoDirName',
    filter: (value: string): string => {
      return formatToProjectName(value.trim());
    },
    transformer: (value: string): string => {
      return formatToProjectName(value.trimStart());
    },
    validate: (value?: string): true | string => {
      if (!value?.trim()) {
        return t<string>('domain.project_name.is_empty');
      }

      if (!isReasonableFilename(value)) {
        return t<string>('domain.project_name.is_not_directory');
      }

      return true;
    }
  });

  const existingContainers = await checkExistingDockerContainers(magentoDirName);

  if (existingContainers) {
    return getMagentoDirName('Docker container with the same name already exists. Please choose another name.');
  }

  return magentoDirName;
};

export default getMagentoDirName;
