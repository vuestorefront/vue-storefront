import { CliUx, Command } from '@oclif/core';
import * as fs from 'fs';
import { access, rm } from 'fs/promises';
import inquirer from 'inquirer';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import * as path from 'path';
import isValidFolderName from 'reasonable-filename';
import { fetchIntegrations, Integration } from '../../domains/integration';

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
    // const {args, flags} = await this.parse(GenerateStore)

    let suggestion: null | string = null;

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
      },
      {
        type: 'input',
        name: 'customIntegrationGitRepositoryURL',
        when(answers) {
          return !answers.integration.gitRepositoryURL;
        },
        message: 'What\'s the URL of the custom integration\'s git repository?',
        validate: async (url: string): Promise<true | string> => {
          suggestion = null;

          try {
            await git.getRemoteInfo2({
              url,
              http
            });

            return true;
          } catch (error: unknown) {
            if (error instanceof git.Errors.UnknownTransportError) {
              if (error.data.suggestion) {
                // eslint-disable-next-line max-depth
                try {
                  await git.getRemoteInfo2({
                    url: error.data.suggestion,
                    http
                  });

                  suggestion = error.data.suggestion;
                  // eslint-disable-next-line no-empty
                } catch {}
              }
            }

            if (suggestion) return true;

            return error instanceof git.Errors.UrlParseError
              ? 'Please type in a valid git repository URL.'
              : 'Couldn\'t locate git repository with the received URL.';
          }
        }
      },
      {
        type: 'confirm',
        name: 'acceptSuggestionAsCustomIntegrationGitRepositoryURL',
        when: () => Boolean(suggestion),
        message: () => `The protocol isn't supported. Use "${suggestion}" instead?`
      }
    ]);

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

    const bar = CliUx.ux.progress({
      fps: 64,
      format: '||{bar} || {percentage}% ',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591'
    });

    bar.start();

    const url =
      answers.integration.gitRepositoryURL ??
      ((answers.acceptSuggestionAsCustomIntegrationGitRepositoryURL ? suggestion : /* Should never happen */ null) as unknown as string);

    await git.clone({
      fs,
      dir,
      url,
      http,
      onProgress(progress) {
        if (progress.loaded < progress.total) {
          bar.update(progress.loaded);
        } else {
          bar.stop();
        }
      }
    });

    await rm(path.resolve(dir, '.git'), {
      force: true,
      recursive: true
    });

    console.log(`Sucessfully created your project at "./${answers.projectName}".`);
    process.exit(0);
  }
}
