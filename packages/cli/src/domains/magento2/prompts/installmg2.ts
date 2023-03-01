import { confirm, note } from '@clack/prompts';
import { t } from 'i18next';

/** Prompt user if they want to install Magento 2 locally. */
const isInstallMagento = async (message: string): Promise<boolean> => {
  note(t('command.generate_store.magento.install_note'));

  const isInstallMagento = await confirm({
    message
  });

  return isInstallMagento as boolean;
};

export default isInstallMagento;
