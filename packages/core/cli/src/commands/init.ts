import log from '../utils/log';
import getIntegrationsFromPackage from '../utils/getIntegrationsFromPackage';
import inquirer from 'inquirer';
import createProject from '../scripts/createProject';
import path from 'path';

const program = async () => {
  const [projectName] = process.argv.slice(2);
  if (!projectName) {
    log.error('Provide projectName: yarn cli:init <projectName>');
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

program();
