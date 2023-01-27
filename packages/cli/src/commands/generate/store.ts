import { Command } from '@oclif/core';
import { t } from 'i18next';
import inquirer from 'inquirer';
import picocolors from 'picocolors';
import * as path from 'path';
import fs from 'fs';
import { getIntegration } from '../../domains/integration';
import { getProjectName } from '../../domains/project-name';
import { cloneGitRepository, terminateGitRepository } from '../../domains/git-repository';
import { existsDirectory } from '../../domains/directory';
import { confirmOverwrite, getMagentoDirName, installMg2Prompt, handleMagentoKeys, isMagentoKeys, copyAuth, handleGraphQL, isGenerateSampleData, handleSampleData, copyEnv } from '../../domains/magento2';
import { checkDocker, getMagentoDomainName, installMagentoImage } from '../../domains/magento2/docker';

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

    const { name: integrationName } = integration;

    const projectDir = path.resolve(projectName);

    if (await existsDirectory(projectDir)) {
      const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>({
        type: 'confirm',
        name: 'overwrite',
        message: () => t('command.generate_store.input.overwrite', { projectName }) as string
      });

      if (!overwrite) {
        this.log(t('command.generate_store.message.skipping'));
        this.exit(0);
      }
    }

    if (integrationName === 'Magento 2') {
      let magentoAccessKey: string;
      let magentoSecretKey: string;

      const isInstallMagento = await installMg2Prompt('Do you want to install Magento?');

      if (isInstallMagento) {
        const magentoDirName = await getMagentoDirName('Magento directory name');

        // check if the directory with the name magentoDirName exists in the current directory
        // if yes, ask if the user wants to overwrite it
        // if no, create the directory
        if (!fs.existsSync(magentoDirName)) {
          fs.mkdirSync(magentoDirName);
        } else {
          await confirmOverwrite({
            message: `The directory ${magentoDirName} already exists. Do you want to overwrite it?`,
            magentoDirName,
            self: this
          });
        }

        // prompt user if they have Magento access keys
        // if yes, ask for the keys
        // if no, provide a link to the Magento website to get the keys
        const hasMagentoKeys = await isMagentoKeys('Do you have Magento access keys?');

        if (hasMagentoKeys) {
          const { accessKey, secretKey } = await handleMagentoKeys('Please provide your Magento access keys');

          magentoAccessKey = accessKey;
          magentoSecretKey = secretKey;
        } else {
          this.log('Please go to https://experienceleague.adobe.com/docs/commerce-operations/installation-guide/prerequisites/authentication-keys.html and follow instructions to get your Magento access keys');

          // prompt user to enter the keys
          const { accessKey, secretKey } = await handleMagentoKeys('Please provide your Magento access keys');

          magentoAccessKey = accessKey;
          magentoSecretKey = secretKey;
        }

        const isDockerInstalled = await checkDocker();

        if (isDockerInstalled) {
          const magentoDomainName = await getMagentoDomainName('Magento domain name');
          await installMagentoImage(magentoDirName, magentoDomainName, this);

          await copyAuth(magentoDirName, magentoAccessKey, magentoSecretKey);

          await handleGraphQL(magentoDirName);

          const isGenerateData = await isGenerateSampleData('Do you want to generate sample data for the store?');

          // eslint-disable-next-line max-depth
          if (isGenerateData) {
            await handleSampleData(magentoDirName);
          }
        }
      }
    }

    await cloneGitRepository({
      projectDir,
      gitRepositoryURL: integration.gitRepositoryURL
    });

    await copyEnv(projectDir);

    await terminateGitRepository(projectDir);

    this.log(t('command.generate_store.message.success', { projectName }));
    this.log(t('command.generate_store.message.install'));
    this.log('');
    this.log(picocolors.green(t<string>('command.generate_store.message.install_commands.0', { projectName })));
    this.log(picocolors.green(t<string>('command.generate_store.message.install_commands.1', { projectName })));
    this.log('');

    if (integration.documentationURL) {
      this.log(
        t('command.generate_store.message.configure', {
          documentationURL: integration.documentationURL
        })
      );
    }

    this.log(t('command.generate_store.message.start'));
    this.log('');
    this.log(picocolors.green(t<string>('command.generate_store.message.start_command', { projectName })));
    this.log('');
    this.log('');

    this.exit(0);
  }
}
