import inquirer from 'inquirer';
import type Integration from './Integration';
import fetchIntegrations from './fetchIntegrations';
import { getGitRepositoryURL } from '../git-repository-url';

type CustomIntegration = {
  name: string;
  gitRepositoryURL: null;
};

/** The answers expected in the form of 'inquirer'. */
type Answers = {
  integration: Integration | CustomIntegration;
};

/** Gets the integration from user's input. */
const getIntegration = async (): Promise<Integration> => {
  const integrations = await fetchIntegrations();

  const customIntegration: CustomIntegration = {
    name: 'Custom integration',
    gitRepositoryURL: null
  };

  const choices = [...integrations, customIntegration].map((integration) => ({
    name: integration.name,
    value: integration
  }));

  const answers = await inquirer.prompt<Answers>({
    choices,
    type: 'list',
    name: 'integration'
  });

  if (answers.integration.gitRepositoryURL) return answers.integration;

  return {
    ...answers.integration,
    gitRepositoryURL: await getGitRepositoryURL('What\'s the URL of the custom integration\'s git repository?')
  };
};

export default getIntegration;
