import inquirer from 'inquirer';
import isReasonableFilename from 'reasonable-filename';
import formatToProjectName from './formatToProjectName';

/** The answers expected in the form of 'inquirer'. */
type Answers = {
  projectName: string;
};

/** Gets a git repository URL from user's input. */
const getProjectName = async (): Promise<string> => {
  const { projectName } = await inquirer.prompt<Answers>({
    type: 'input',
    name: 'projectName',
    message: 'What is the project name?',
    filter: (value: string): string => {
      return formatToProjectName(value.trim());
    },
    transformer: (value: string): string => {
      return formatToProjectName(value.trimStart());
    },
    validate: (value?: string): true | string => {
      if (!value?.trim()) {
        return 'Please type in the project name.';
      }

      if (!isReasonableFilename(value)) {
        return 'The project name can\'t be invalid directory name.';
      }

      return true;
    }
  });

  return projectName;
};

export default getProjectName;
