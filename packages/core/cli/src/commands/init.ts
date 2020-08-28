import getIntegrations from '../utils/getIntegrations';
import inquirer from 'inquirer';
import copyProject from '../scripts/copyProject';
import path from 'path';

export default async (args) => {
  let projectName = args[0];
  if (!projectName) {
    const { typedProjectName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'typedProjectName',
        message: 'What\'s your project name?',
        validate (value) {
          if (value.trim().length > 0) {
            return true;
          }
          return 'Please provide longer name';
        }
      }
    ]);
    projectName = typedProjectName;
  }

  const integrations = getIntegrations();
  const { chosenIntegration } = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'chosenIntegration',
        message: 'Choose integration',
        choices: integrations
      }
    ]);

  return copyProject(chosenIntegration, path.resolve(process.cwd(), projectName));
};
