import { Command } from '@oclif/core';
import fs from 'fs';
import { t } from 'i18next';
import * as path from 'path';
import { intro, confirm, isCancel, spinner, note } from '@clack/prompts';
import picocolors from 'picocolors';
import { getIntegration } from '../../domains/integration';
import { getProjectName } from '../../domains/project-name';
import {
  cloneGitRepository,
  terminateGitRepository
} from '../../domains/git-repository';
import { existsDirectory } from '../../domains/directory';
import {
  copyEnv,
  installMg2Prompt,
  getMagentoDetails
} from '../../domains/magento2/functions';
import {
  logSimpleErrorMessage,
  logSimpleWarningMessage,
  simpleLog
} from '../../domains/magento2/functions/terminalHelpers';

import { installMagento } from '../../domains/magento2/installMagento';
import { checkDocker } from '../../domains/magento2/docker';
import installDeps from '../../domains/magento2/functions/installDeps';
import checkNode from '../../domains/magento2/functions/checkNode';
import checkYarn from '../../domains/magento2/functions/checkYarn';

export default class GenerateStore extends Command {
  static override description = t('command.generate_store.description');

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    let magentoDomain = '';
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

      if (overwrite) {
        sp.start(
          picocolors.cyan(t('command.generate_store.progress.delete_start'))
        );
        await fs.rmSync(projectDir, { recursive: true, force: true });
        await fs.mkdirSync(projectDir);
        sp.stop(
          picocolors.green(t('command.generate_store.progress.delete_end'))
        );
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
      const isInstallMagento = await installMg2Prompt(
        t('command.generate_store.magento.install')
      );

      await checkNode();
      await checkYarn();
      await checkDocker();

      if (isCancel(isInstallMagento)) {
        logSimpleWarningMessage(t('command.generate_store.message.canceled'));
        process.exit(0);
      }

      const {
        magentoDirName,
        magentoDomainName,
        magentoAccessKey,
        magentoSecretKey
      } = await getMagentoDetails();

      magentoDomain = magentoDomainName;

      if (isInstallMagento) {
        await installMagento({
          isInstallMagento,
          magentoDirName,
          magentoDomainName,
          magentoAccessKey,
          magentoSecretKey
        });
      }
    }

    sp.start(t('command.generate_store.progress.vsf_start'));
    await cloneGitRepository({
      projectDir,
      gitRepositoryURL: integration.gitRepositoryURL
    });

    await copyEnv(projectDir, magentoDomain);
    await terminateGitRepository(projectDir);

    sp.stop(picocolors.green(t('command.generate_store.progress.vsf_end')));

    await installDeps(projectDir);

    if (integration.documentationURL) {
      note(
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

    simpleLog('Happy coding! 🎉', picocolors.green);

    this.exit(0);
  }
}
