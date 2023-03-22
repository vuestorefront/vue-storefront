import { installMagentoImage } from './docker';

import {
  copyAuth,
  handleGraphQL,
  handleSampleData,
  isGenerateSampleData
} from './functions';

import { note } from '@clack/prompts';
import { logSimpleSuccessMessage } from './functions/terminalHelpers';
import { t } from 'i18next';

interface MagentoDetails {
  isInstallMagento: boolean;
  magentoDirName: string;
  magentoDomainName: string;
  magentoAccessKey: string;
  magentoSecretKey: string;
}

/** Function responsible for all Magento 2 installation process */
export const installMagento = async ({
  magentoDirName,
  magentoDomainName,
  magentoAccessKey,
  magentoSecretKey
}: MagentoDetails) => {
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
};
