import { Command } from '@oclif/core';
import { t } from 'i18next';
import inquirer from 'inquirer';
import * as path from 'path';
import { getIntegration } from '../../domains/integration';
import { getProjectName } from '../../domains/project-name';
import { cloneGitRepository, terminateGitRepository } from '../../domains/git-repository';
import { existsDirectory } from '../../domains/directory';

export default class GenerateStore extends Command {
  static override description = t('command.generate_store.description');

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    const projectName = await getProjectName(t('command.generate_store.input.project_name'));

    const integration = await getIntegration({
      message: t('command.generate_store.input.integration'),
      customIntegrationRepositoryMessage: t('command.generate_store.input.custom_integration_repository')
    });

    const projectDir = path.join(process.cwd(), projectName);

    if (await existsDirectory(projectDir)) {
      const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>({
        type: 'confirm',
        name: 'overwrite',
        message: () => t('command.generate_store.input.overwrite', { projectName })
      });

      if (!overwrite) {
        this.log(t('command.generate_store.message.skipping'));
        this.exit(0);
      }
    }

    await cloneGitRepository({
      projectDir,
      gitRepositoryURL: integration.gitRepositoryURL
    });

    await terminateGitRepository(projectDir);

    this.log(t('command.generate_store.message.success', { projectName }));
    this.exit(0);
  }
}
