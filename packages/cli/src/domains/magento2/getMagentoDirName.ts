import { t } from 'i18next';
import isReasonableFilename from 'reasonable-filename';
import formatToProjectName from '../project-name/formatToProjectName';
import { checkExistingDockerContainers } from './docker';

import { text, isCancel } from '@clack/prompts';
import { logSimpleWarningMessage } from './terminalHelpers';

/** Gets a git repository URL from user's input. */
const getMagentoDirName = async (message: string): Promise<string> => {
  const magentoDirName = await text({
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

  if (isCancel(magentoDirName)) {
    logSimpleWarningMessage(t('command.generate_store.message.canceled'));
    process.exit(0);
  }

  const existingContainers = await checkExistingDockerContainers(
    formatToProjectName(magentoDirName as string)
  );

  if (existingContainers) {
    return getMagentoDirName(
      'Docker container with the same name already exists. Please choose another name: \n'
    );
  }

  return formatToProjectName(magentoDirName as string);
};

export default getMagentoDirName;
