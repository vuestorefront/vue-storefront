import integrations from '../utils/getIntegrations';
import inquirer from 'inquirer';
import createProject from '../scripts/createProject';
import { customTemplateStrategy } from '../scripts/initStarategy/customTemplateStarategy';
export const CUSTOM_TEMPLATE = 'Custom template from Github';
export default async (args) => {
  const cwd = process.cwd();
  const integrationsNames = Object.keys(integrations);
  let projectName = args.join('-') || args[0];

  if (!projectName) {
    const { typedProjectName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'typedProjectName',
        message: 'What\'s your project name?',
        validate(value) {
          if (value.trim().length > 0) {
            return true;
          }
          return 'Please provide longer name';
        }
      }
    ]);
    projectName = typedProjectName.split(' ').join('-') || typedProjectName;
  }

  const { chosenIntegration } = await inquirer.prompt([
    {
      type: 'list',
      name: 'chosenIntegration',
      message: 'Choose integration',
      choices: [...integrationsNames, CUSTOM_TEMPLATE]
    }
  ]);

  if (chosenIntegration !== CUSTOM_TEMPLATE) {
    await createProject({
      projectName: projectName,
      targetPath: cwd,
      repositoryLink: integrations[chosenIntegration]
    });
    return;
  }

  await customTemplateStrategy({ projectName, targetPath: cwd });
};
