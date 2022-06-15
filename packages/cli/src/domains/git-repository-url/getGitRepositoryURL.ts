import { t } from 'i18next';
import inquirer from 'inquirer';
import git from 'isomorphic-git';
import extractSuggestionFromError from './extractSuggestionFromError';
import validateGitRepositoryURL from './validateGitRepositoryURL';

/** The answers expected in the form of 'inquirer'. */
type Answers = {
  gitRepositoryURL: string;
  acceptSuggestionAsGitRepositoryURL: boolean;
};

/** Gets a git repository URL from user's input. */
const getGitRepositoryURL = async (message: string): Promise<string> => {
  let suggestion: null | string = null;

  const answers = await inquirer.prompt<Answers>([
    {
      type: 'input',
      name: 'gitRepositoryURL',
      message,
      validate: async (url: string): Promise<true | string> => {
        suggestion = null;

        const [valid, error] = await validateGitRepositoryURL(url);

        if (valid) return true;

        suggestion = await extractSuggestionFromError(error);

        if (suggestion) return true;

        return error instanceof git.Errors.UrlParseError
          ? t<string>('domain.git_repository_url.is_invalid')
          : t<string>('domain.git_repository_url.was_not_found');
      }
    },
    {
      type: 'confirm',
      name: 'acceptSuggestionAsGitRepositoryURL',
      when: () => Boolean(suggestion),
      message: () => t('domain.git_repository_url.suggestion', { suggestion })
    }
  ]);

  if (!suggestion) return answers.gitRepositoryURL;

  return answers.acceptSuggestionAsGitRepositoryURL ? suggestion : getGitRepositoryURL(message);
};

export default getGitRepositoryURL;
