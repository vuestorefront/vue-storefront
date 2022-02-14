import { cloneGitRepository, terminateGitRepository } from '../../domains/git-repository';
import { Command } from '@oclif/core';
import { access } from 'fs/promises';
import inquirer from 'inquirer';
import * as path from 'path';
import { fetchIntegrations, Integration } from '../../domains/integration';
import { getGitRepositoryURL } from '../../domains/git-repository-url';
import { getProjectName } from '../../domains/project-name';

const existsFolder = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

type CustomIntegration = {
  name: string;
  gitRepositoryURL: null;
};

const CUSTOM_INTEGRATION: CustomIntegration = {
  name: 'Custom integration',
  gitRepositoryURL: null
};

export default class GenerateStore extends Command {
  static override description = 'describe the command here';

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    const integrations = await fetchIntegrations();

    const projectName = await getProjectName();

    const projectDir = path.join(process.cwd(), projectName);

    const answers = await inquirer.prompt<{ integration: Integration | CustomIntegration }>({
      type: 'list',
      name: 'integration',
      choices: [...integrations, CUSTOM_INTEGRATION].map((integration) => ({
        name: integration.name,
        value: integration
      }))
    });

    const gitRepositoryURL =
      answers.integration.gitRepositoryURL ?? (await getGitRepositoryURL('What\'s the URL of the custom integration\'s git repository?'));

    const dir = path.resolve(process.cwd(), projectName);

    const alreadyExistsFolder = await existsFolder(dir);

    if (alreadyExistsFolder) {
      const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>([
        {
          type: 'confirm',
          name: 'overwrite',
          message: () => `"./${projectName}" already exists. Overwrite?`
        }
      ]);

      if (!overwrite) {
        console.log('Skipping the installation…');
        process.exit(0);
      }
    }

    await cloneGitRepository({
      gitRepositoryURL,
      projectDir
    });

    await terminateGitRepository(dir);

    console.log(`Sucessfully created your project at "./${projectName}".`);
    process.exit(0);
  }
}
