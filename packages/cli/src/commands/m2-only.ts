import { intro } from '@clack/prompts';
import { Command } from '@oclif/core';
import { initLogger } from '../domains/logging/logger';
import { checkDocker, getMagentoDomainName } from '../domains/magento2/docker';
import { getMagentoDetails } from '../domains/magento2/functions';
import { installMagento } from '../domains/magento2/installMagento';
import { simpleLog } from '../domains/magento2/functions/terminalHelpers';
import picocolors from 'picocolors';
import { t } from 'i18next';

export default class M2Only extends Command {
  static override description = 'Install local Magento 2 instance';

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    const { writeLog, deleteLog } = initLogger();

    intro('Welcome to the Magento 2 local instance installer!');

    await checkDocker(writeLog);

    const { magentoDirName, magentoAccessKey, magentoSecretKey } =
      await getMagentoDetails();

    const magentoDomain = await getMagentoDomainName(
      t('command.generate_store.magento.domain')
    );

    await installMagento({
      isInstallMagento: true,
      magentoDirName,
      magentoDomain,
      magentoAccessKey,
      magentoSecretKey,
      writeLog
    });

    deleteLog();

    simpleLog('Happy coding! 🎉', picocolors.green);

    this.exit(0);
  }
}
