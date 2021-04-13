import getIntegrations from '../utils/getIntegrations';
import inquirer from 'inquirer';
import copyProject from '../scripts/copyProject';
import path from 'path';
import createProject from '../scripts/createProject';

const CUSTOM_TEMPLATE = 'custom integration template';

export default async (args) => {
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

  const integrations = Object.keys(getIntegrations());
  const { chosenIntegration } = await inquirer.prompt([
    {
      type: 'list',
      name: 'chosenIntegration',
      message: 'Choose integration',
      choices: [...integrations, CUSTOM_TEMPLATE]
    }
  ]);

  if (chosenIntegration !== CUSTOM_TEMPLATE) {
    return copyProject(
      chosenIntegration,
      path.resolve(process.cwd(), projectName),
      projectName
    );
  }

  const { otherIntegrationName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'otherIntegrationName',
      message: 'Provide integration name:',
      validate(value) {
        if (value.trim().length === 0) {
          return 'Please provide longer name';
        }
        return true;
      }
    }
  ]);

  const { otherIntegrationGitLink } = await inquirer.prompt([
    {
      type: 'input',
      name: 'otherIntegrationGitLink',
      message: 'Provide integration repository git link via https:',
      validate(value) {
        const gitLinkRegex = /https?:(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/;
        if (value.trim().length === 0 || !gitLinkRegex.test(value)) {
          return 'Please provide git repository https link';
        }
        return true;
      }
    }
  ]);
  const cwd = process.cwd();
  const integrationTemplatesDirectory = path.resolve('./templates');
  await createProject({
    integration: otherIntegrationName,
    targetPath: integrationTemplatesDirectory,
    repositoryLink: otherIntegrationGitLink
  });
  return copyProject(
    otherIntegrationName,
    path.resolve(cwd, projectName),
    projectName
  );
};
