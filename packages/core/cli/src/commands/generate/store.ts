import { cloneGitRepository, terminateGitRepository } from '../../domains/git-repository';
import { Command } from '@oclif/core';
import { access } from 'fs/promises';
import inquirer from 'inquirer';
import * as path from 'path';
import { getIntegration } from '../../domains/integration';
import { getProjectName } from '../../domains/project-name';

const existsFolder = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

export default class GenerateStore extends Command {
  static override description = 'describe the command here';

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    const projectName = await getProjectName();

    const integration = await getIntegration();

    const projectDir = path.join(process.cwd(), projectName);

    if (await existsFolder(projectDir)) {
      const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>({
        type: 'confirm',
        name: 'overwrite',
        message: () => `"./${projectName}" already exists. Overwrite?`
      });

      if (!overwrite) {
        console.log('Skipping the installation…');
        process.exit(0);
      }
    }

    await cloneGitRepository({
      projectDir,
      gitRepositoryURL: integration.gitRepositoryURL
    });

    await terminateGitRepository(projectDir);

    console.log(`Sucessfully created your project at "./${projectName}".`);
    process.exit(0);
  }
}
