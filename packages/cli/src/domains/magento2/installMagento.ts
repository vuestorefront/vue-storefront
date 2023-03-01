import {
  checkDocker,
  getMagentoDomainName,
  installMagentoImage
} from './docker';
import {
  confirmOverwrite,
  copyAuth,
  getMagentoDirName,
  handleGraphQL,
  handleMagentoKeys,
  handleSampleData,
  installMg2Prompt,
  isGenerateSampleData,
  isMagentoKeys
} from './functions';

import { isCancel, note } from '@clack/prompts';
import {
  logSimpleSuccessMessage,
  logSimpleWarningMessage,
  simpleLog
} from './functions/terminalHelpers';
import { t } from 'i18next';
import fs from 'fs';

/** Function responsible for all Magento 2 installation process */
export const installMagento = async () => {
  let magentoAccessKey: string;
  let magentoSecretKey: string;

  await checkDocker();

  const isInstallMagento = await installMg2Prompt(
    t('command.generate_store.magento.install')
  );

  if (isCancel(isInstallMagento)) {
    logSimpleWarningMessage(t('command.generate_store.message.canceled'));
    process.exit(0);
  }

  if (isInstallMagento) {
    const magentoDirName = await getMagentoDirName(
      t('command.generate_store.magento.directory')
    );

    if (!fs.existsSync(magentoDirName)) {
      fs.mkdirSync(magentoDirName);
    } else {
      await confirmOverwrite({
        message: t('command.generate_store.magento.overwrite', {
          magentoDirName
        }),
        magentoDirName
      });
    }

    const hasMagentoKeys = await isMagentoKeys(
      t('command.generate_store.magento.access_keys')
    );

    if (hasMagentoKeys) {
      simpleLog(t('command.generate_store.magento.provide_keys'));
      const { accessKey, secretKey } = await handleMagentoKeys();

      magentoAccessKey = accessKey;
      magentoSecretKey = secretKey;
    } else {
      note(t('command.generate_store.magento.no_keys'));

      simpleLog(t('command.generate_store.magento.provide_keys'));
      const { accessKey, secretKey } = await handleMagentoKeys();

      magentoAccessKey = accessKey;
      magentoSecretKey = secretKey;
    }

    const magentoDomainName = await getMagentoDomainName(
      t('command.generate_store.magento.domain')
    );

    await installMagentoImage(magentoDirName, magentoDomainName);
    await copyAuth(magentoDirName, magentoAccessKey, magentoSecretKey);
    await handleGraphQL(magentoDirName);

    const isGenerateData = await isGenerateSampleData(
      t('command.generate_store.magento.sample_data')
    );

    if (isGenerateData) {
      await handleSampleData(magentoDirName);
    } else {
      note(t('command.generate_store.magento.sample_data_note'));
    }

    logSimpleSuccessMessage(t('command.generate_store.magento.success'));
  }
};
