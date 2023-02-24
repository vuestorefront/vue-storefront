import { Command } from '@oclif/core';
import { t } from 'i18next';
import inquirer from 'inquirer';
import * as path from 'path';
import fs from 'fs';
import { getIntegration } from '../../domains/integration';
import { getProjectName } from '../../domains/project-name';
import {
  cloneGitRepository,
  terminateGitRepository
} from '../../domains/git-repository';
import { existsDirectory } from '../../domains/directory';
import {
  confirmOverwrite,
  getMagentoDirName,
  installMg2Prompt,
  handleMagentoKeys,
  isMagentoKeys,
  copyAuth,
  handleGraphQL,
  isGenerateSampleData,
  handleSampleData,
  copyEnv
} from '../../domains/magento2';
import {
  checkDocker,
  getMagentoDomainName,
  installMagentoImage
} from '../../domains/magento2/docker';
import {
  logSimpleErrorMessage,
  logSimpleInfoMessage,
  logSimpleSuccessMessage,
  simpleLog
} from '../../domains/magento2/terminalHelpers';

export default class GenerateStore extends Command {
  static override description = t('command.generate_store.description');

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    simpleLog('Welcome to Vue Storefront 2 CLI! 💚');
    const projectName = await getProjectName(
      t('command.generate_store.input.project_name')
    );

    const integration = await getIntegration({
      message: t('command.generate_store.input.integration'),
      customIntegrationRepositoryMessage: t(
        'command.generate_store.input.custom_integration_repository'
      )
    });

    const { name: integrationName } = integration;

    const projectDir = path.resolve(projectName);

    if (await existsDirectory(projectDir)) {
      const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>({
        type: 'confirm',
        name: 'overwrite',
        message: () =>
          t('command.generate_store.input.overwrite', {
            projectName
          }) as string
      });

      if (!overwrite) {
        simpleLog(t('command.generate_store.message.skipping'));
        this.exit(0);
      }
    }

    if (integrationName === 'Magento 2') {
      let magentoAccessKey: string;
      let magentoSecretKey: string;
      let isDockerInstalled: boolean;

      const isInstallMagento = await installMg2Prompt(
        'Do you want to install Magento 2 locally on your computer? (beta)'
      );

      if (isInstallMagento) {
        logSimpleInfoMessage('Checking if Docker is installed...');
        isDockerInstalled = await checkDocker();

        if (!isDockerInstalled) {
          logSimpleErrorMessage(
            'Docker is not installed or not running. Please make sure that prerequisites are complied with and run command again. For more information, please visit https://docs.vuestorefront.io/magento/installation-setup/configure-magento.html'
          );
          this.exit(1);
        } else {
          logSimpleSuccessMessage(
            'Docker is installed and running. Proceeding with Magento 2 installation...'
          );
        }

        const magentoDirName = await getMagentoDirName(
          'Magento directory name'
        );

        // check if the directory with the name magentoDirName exists in the current directory
        // if yes, ask if the user wants to overwrite it
        // if no, create the directory
        if (!fs.existsSync(magentoDirName)) {
          fs.mkdirSync(magentoDirName);
        } else {
          await confirmOverwrite({
            message: `The directory ${magentoDirName} already exists. Do you want to overwrite it?`,
            magentoDirName
          });
        }

        // prompt user if they have Magento access keys
        // if yes, ask for the keys
        // if no, provide a link to the Magento website to get the keys
        const hasMagentoKeys = await isMagentoKeys(
          'Do you have Magento access keys?'
        );

        if (hasMagentoKeys) {
          simpleLog('Please provide your Magento access keys');
          const { accessKey, secretKey } = await handleMagentoKeys();

          magentoAccessKey = accessKey;
          magentoSecretKey = secretKey;
        } else {
          simpleLog(
            'Please go to Adobe Authentication Keys Guide https://experienceleague.adobe.com/docs/commerce-operations/installation-guide/prerequisites/authentication-keys.html and follow instructions to get your Magento access keys'
          );

          // prompt user to enter the keys

          simpleLog('Please provide your Magento access keys');
          const { accessKey, secretKey } = await handleMagentoKeys();

          magentoAccessKey = accessKey;
          magentoSecretKey = secretKey;
        }

        const magentoDomainName = await getMagentoDomainName(
          'Magento domain name'
        );

        await installMagentoImage(magentoDirName, magentoDomainName);
        await copyAuth(magentoDirName, magentoAccessKey, magentoSecretKey);
        await handleGraphQL(magentoDirName);

        const isGenerateData = await isGenerateSampleData(
          'Do you want to generate sample data for the store?'
        );

        if (isGenerateData) {
          await handleSampleData(magentoDirName);
        } else {
          logSimpleInfoMessage(
            'You can generate sample data later by running `bin/magento sampledata:deploy` in the Magento directory'
          );
          logSimpleInfoMessage(
            'You can generate sample data later by running `bin/magento sampledata:deploy` in the Magento directory'
          );
        }

        logSimpleSuccessMessage(
          'Magento 2 has been installed successfully. Proceeding with Vue Storefront installation...'
        );
      }
    }

    await cloneGitRepository({
      projectDir,
      gitRepositoryURL: integration.gitRepositoryURL
    });

    await copyEnv(projectDir);

    await terminateGitRepository(projectDir);

    simpleLog(t('command.generate_store.message.success', { projectName }));
    simpleLog(t('command.generate_store.message.install'));
    simpleLog('');
    logSimpleSuccessMessage(
      t<string>('command.generate_store.message.install_commands.0', {
        projectName
      })
    );
    logSimpleSuccessMessage(
      t<string>('command.generate_store.message.install_commands.1', {
        projectName
      })
    );
    simpleLog('');

    if (integration.documentationURL) {
      simpleLog(
        t('command.generate_store.message.configure', {
          documentationURL: integration.documentationURL
        })
      );
    }

    simpleLog(t('command.generate_store.message.start'));
    simpleLog('');
    logSimpleSuccessMessage(
      t<string>('command.generate_store.message.start_command', {
        projectName
      })
    );
    simpleLog('');
    simpleLog('');

    this.exit(0);
  }
}
