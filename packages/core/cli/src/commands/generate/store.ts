import { cloneGitRepository, terminateGitRepository } from '../../domains/git-repository';
import { Command } from '@oclif/core';
import { access } from 'fs/promises';
import inquirer from 'inquirer';
import * as path from 'path';
import isValidFolderName from 'reasonable-filename';
import { fetchIntegrations, Integration } from '../../domains/integration';
import { getGitRepositoryURL } from '../../domains/git-repository-url';

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

type Answers = {
  projectName: string;
  integration: Integration | CustomIntegration;
  customIntegrationGitRepositoryURL: null | string;
  acceptSuggestionAsCustomIntegrationGitRepositoryURL: boolean;
  overwrite: boolean;
};

export default class GenerateStore extends Command {
  static override description = 'describe the command here';

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    const integrations = await fetchIntegrations();

    const answers = await inquirer.prompt<Answers>([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the project name?',
        filter(value: string): string {
          return value.trim().replace(/\s+/g, '-');
        },
        transformer(value: string): string {
          return value.trimStart().replace(/\s+/g, '-');
        },
        validate(value?: string): true | string {
          if (!value?.trim()) {
            return 'Please type in the project name.';
          }

          if (!isValidFolderName(value)) {
            return 'The project name can\'t be invalid directory name.';
          }

          return true;
        }
      },
      {
        type: 'list',
        name: 'integration',
        choices: [...integrations, CUSTOM_INTEGRATION].map((integration) => ({
          name: integration.name,
          value: integration
        }))
      }
    ]);

    const gitRepositoryURL =
      answers.integration.gitRepositoryURL ?? (await getGitRepositoryURL('What\'s the URL of the custom integration\'s git repository?'));

    const dir = path.resolve(process.cwd(), answers.projectName);

    const alreadyExistsFolder = await existsFolder(dir);

    if (alreadyExistsFolder) {
      const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>([
        {
          type: 'confirm',
          name: 'overwrite',
          message: () => `"./${answers.projectName}" already exists. Overwrite?`
        }
      ]);

      if (!overwrite) {
        console.log('Skipping the installation…');
        process.exit(0);
      }
    }

    await cloneGitRepository({
      gitRepositoryURL,
      projectDir: dir
    });

    await terminateGitRepository(dir);

    console.log(`Sucessfully created your project at "./${answers.projectName}".`);
    process.exit(0);
  }
}
