import { integrations } from '../utils/getIntegrations';
import inquirer from 'inquirer';
import createProject from '../scripts/createProject';

export default async (args) => {
  const CUSTOM_TEMPLATE = 'Custom template from Github';
  const cwd = process.cwd();
  const integrationsNames = Object.keys(integrations);
  let projectName = args[0];

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
    projectName = typedProjectName;
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

  const { otherIntegrationGitLink } = await inquirer.prompt([
    {
      type: 'input',
      name: 'otherIntegrationGitLink',
      message: 'Provide integration repository git link via https:',
      validate(value) {
        /* eslint-disable-next-line no-useless-escape*/
        const gitLinkRegex = /https?:(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/;
        if (value.trim().length === 0 || !gitLinkRegex.test(value)) {
          return 'Please provide git repository https link';
        }
        return true;
      }
    }
  ]);

  await createProject({
    projectName: projectName,
    targetPath: cwd,
    repositoryLink: otherIntegrationGitLink
  });
};
