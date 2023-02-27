import { t } from 'i18next';
// import inquirer from 'inquirer';
import git from 'isomorphic-git';
import extractSuggestionFromError from './extractSuggestionFromError';
import validateGitRepositoryURL from './validateGitRepositoryURL';

import { text, isCancel, cancel } from '@clack/prompts';

const validateURL = async (url: string): Promise<string | void> => {
  const [valid, error] = await validateGitRepositoryURL(url);

  if (valid) return 'Valid';

  console.log(
    error instanceof git.Errors.UrlParseError
      ? t<string>('domain.git_repository_url.is_invalid')
      : t<string>('domain.git_repository_url.was_not_found')
  );
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
  const isValid = await validateURL(answer as string);

  if (isValid === 'Valid') return answer as string;

  // Suggestion
  const suggestion = await suggestURL(answer as string);

  if (suggestion) {
    const answer = await text({
      message: t('domain.git_repository_url.suggestion', { suggestion })
    });

    if (isCancel(answer)) {
      cancel('Installation cancelled');
      return '';
    }

    if (answer) return answer as string;
  }

  return getGitRepositoryURL(message);
};

export default getGitRepositoryURL;
