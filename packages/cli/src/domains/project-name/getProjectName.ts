import { t } from 'i18next';
// import inquirer from 'inquirer';
import isReasonableFilename from 'reasonable-filename';
import formatToProjectName from './formatToProjectName';

import { text } from '@clack/prompts';

const getProjectName = async (message: string): Promise<string> => {
  const projectName = await text({
    message,
    validate: (value?: string): string | void => {
      if (!value?.trim()) {
        return t<string>('domain.project_name.is_empty');
      }

      if (!isReasonableFilename(value)) {
        return t<string>('domain.project_name.is_not_directory');
      }
    }
  });

  return formatToProjectName(projectName as string);
};

export default getProjectName;
