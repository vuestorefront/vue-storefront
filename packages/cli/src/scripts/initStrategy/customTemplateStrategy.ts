import createProject from '../createProject';
import inquirer from 'inquirer';

interface ICustomTemplateStrategyParams {
  projectName: string;
  targetPath: string;
}

export async function customTemplateStrategy({
  projectName,
  targetPath
}: ICustomTemplateStrategyParams) {
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
    targetPath: targetPath,
    repositoryLink: otherIntegrationGitLink
  });
}
