import getIntegrationsFromPackage from '@vue-storefront/cli/src/utils/getIntegrationsFromPackage';
import inquirer from 'inquirer';
import createProject from '../scripts/createProject';
import path from 'path';

export default async (args: string[]) => {
  let projectName = args[0];
  if (!projectName) {
    const { typedProjectName } = await inquirer.prompt([
      expect.objectContaining({
        type: 'input',
        name: 'typedProjectName',
        message: 'What\'s your project name?'
      })
    ]);
    projectName = typedProjectName;
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
