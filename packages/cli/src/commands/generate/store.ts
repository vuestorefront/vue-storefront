import { Command } from '@oclif/core';
import { t } from 'i18next';
import * as path from 'path';
import { getIntegration } from '../../domains/integration';
import { getProjectName } from '../../domains/project-name';
import {
  cloneGitRepository,
  terminateGitRepository
} from '../../domains/git-repository';
import { existsDirectory } from '../../domains/directory';
import { copyEnv } from '../../domains/magento2/functions';
import {
  logSimpleErrorMessage,
  logSimpleWarningMessage,
  simpleLog
} from '../../domains/magento2/functions/terminalHelpers';

import { intro, confirm, isCancel, spinner } from '@clack/prompts';
import picocolors from 'picocolors';
import { installMagento } from '../../domains/magento2/installMagento';

export default class GenerateStore extends Command {
  static override description = t('command.generate_store.description');

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    const sp = spinner();

    intro(t('command.generate_store.message.intro'));
    const projectName = await getProjectName(
      t('command.generate_store.input.project_name')
    );

    const projectDir = path.resolve(projectName);

    if (await existsDirectory(projectDir)) {
      const overwrite = await confirm({
        message: t('command.generate_store.input.overwrite', {
          projectName
        }) as string
      });

      if (isCancel(overwrite)) {
        logSimpleWarningMessage(t('command.generate_store.message.canceled'));
        this.exit(0);
      }

      if (!overwrite) {
        logSimpleErrorMessage(t('command.generate_store.message.skipping'));
        this.exit(0);
      }
    }

    const integration = await getIntegration({
      message: t('command.generate_store.input.integration'),
      customIntegrationRepositoryMessage: t(
        'command.generate_store.input.custom_integration_repository'
      )
    });

    const { name: integrationName } = integration;

    if (integrationName === 'Magento 2') {
      await installMagento();
    }

    sp.start(t('command.generate_store.progress.vsf_start'));
    await cloneGitRepository({
      projectDir,
      gitRepositoryURL: integration.gitRepositoryURL
    });

    await copyEnv(projectDir);

    await terminateGitRepository(projectDir);

    sp.stop(picocolors.green(t('command.generate_store.progress.vsf_end')));

    simpleLog(t('command.generate_store.message.install'));
    simpleLog(
      t<string>('command.generate_store.message.install_commands.0', {
        projectName
      }),
      picocolors.magenta
    );
    simpleLog(
      t<string>('command.generate_store.message.install_commands.1', {
        projectName
      }),
      picocolors.magenta
    );

    if (integration.documentationURL) {
      simpleLog(
        t('command.generate_store.message.configure', {
          documentationURL: integration.documentationURL
        })
      );
    }
    simpleLog(t('command.generate_store.message.start'));
    simpleLog(
      t<string>('command.generate_store.message.start_command', {
        projectName
      }),
      picocolors.magenta
    );

    simpleLog('');
    simpleLog('');

    simpleLog('Happy coding! 🎉', picocolors.green);

    this.exit(0);
  }
}
