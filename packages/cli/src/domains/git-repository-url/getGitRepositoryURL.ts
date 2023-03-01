import { t } from 'i18next';
// import inquirer from 'inquirer';
import git from 'isomorphic-git';
import extractSuggestionFromError from './extractSuggestionFromError';
import validateGitRepositoryURL from './validateGitRepositoryURL';

import { text, isCancel, cancel, confirm } from '@clack/prompts';
import { simpleLog } from '../magento2/functions/terminalHelpers';

const validateURL = async (url: string): Promise<string | void | any> => {
  const [valid, error] = await validateGitRepositoryURL(url);

  if (valid) return 'Valid';

  simpleLog(
    error instanceof git.Errors.UrlParseError
      ? t<string>('domain.git_repository_url.is_invalid')
      : t<string>('domain.git_repository_url.was_not_found')
  );

  return error;
};

const suggestURL = async (url: string): Promise<string | null> => {
  let suggestion: null | string = null;

  suggestion = await extractSuggestionFromError(url);

  if (suggestion) return suggestion;

  return null;
};

/** Gets a git repository URL from user's input. */
const getGitRepositoryURL = async (message: string): Promise<string> => {
  // URL
  const answer = await text({
    message
  });

  if (isCancel(answer)) {
    cancel('Installation cancelled');
    return '';
  }

  // Validation
  const validateResult = await validateURL(answer as string);

  if (validateResult === 'Valid') return answer as string;

  // Suggestion
  const suggestion = await suggestURL(validateResult);

  if (suggestion) {
    const answer = await confirm({
      message: t('domain.git_repository_url.suggestion', { suggestion })
    });

    if (isCancel(answer)) {
      cancel('Installation cancelled');
      return '';
    }

    if (answer) return suggestion;
  }

  return getGitRepositoryURL(message);
};

export default getGitRepositoryURL;
