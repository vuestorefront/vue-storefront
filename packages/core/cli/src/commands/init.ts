import log from '../utils/log';
import getIntegrationsFromPackage from '@vue-storefront/cli/src/utils/getIntegrationsFromPackage';
import inquirer from 'inquirer';
import createProject from '../scripts/createProject';
import path from 'path';

export default async ([projectName]) => {
  if (!projectName) {
    log.error('Provide projectName: yarn cli:init <projectName>');
    return;
  }

  const integrations = getIntegrationsFromPackage();
  const { chosenIntegration } = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'chosenIntegration',
        message: 'Choose integration',
        choices: integrations
      }
    ]);

  return createProject(chosenIntegration, path.resolve(process.cwd(), projectName));
};
