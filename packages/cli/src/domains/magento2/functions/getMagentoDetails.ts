import confirmOverwrite from '../prompts/confirmOverwrite';
import getMagentoDirName from '../prompts/getMagentoDirName';
import fs from 'fs';
import isMagentoKeys from '../prompts/isMagentoKeys';
import { simpleLog } from './terminalHelpers';
import { t } from 'i18next';
import handleMagentoKeys from '../prompts/handleMagentoKeys';
import { note } from '@clack/prompts';
import { getMagentoDomainName } from '../docker';

const getMagentoDetails = async () => {
  let magentoAccessKey: string;
  let magentoSecretKey: string;
  let newMagentoDirName = '';

  note(t('command.generate_store.magento.info'));

  const magentoDirName = await getMagentoDirName(
    t('command.generate_store.magento.directory')
  );

  if (!fs.existsSync(magentoDirName)) {
    fs.mkdirSync(magentoDirName);
  } else {
    newMagentoDirName = await confirmOverwrite({
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

  return {
    magentoDirName: newMagentoDirName || magentoDirName,
    magentoDomainName,
    magentoAccessKey,
    magentoSecretKey
  };
};

export default getMagentoDetails;
