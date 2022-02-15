import { t } from 'i18next';
import inquirer from 'inquirer';
import isReasonableFilename from 'reasonable-filename';
import formatToProjectName from './formatToProjectName';

/** The answers expected in the form of 'inquirer'. */
type Answers = {
  projectName: string;
};

/** Gets a git repository URL from user's input. */
const getProjectName = async (message: string): Promise<string> => {
  const { projectName } = await inquirer.prompt<Answers>({
    type: 'input',
    name: 'projectName',
    message,
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

  return projectName;
};

export default getProjectName;
