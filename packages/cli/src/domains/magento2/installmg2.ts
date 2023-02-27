import { confirm, note } from '@clack/prompts';

/** Prompt user if they want to install Magento 2 locally. */
const isInstallMagento = async (message: string): Promise<boolean> => {
  note(
    'This feature is still in beta.\nThanks for your patience! 🙏 \nYou can report any issues here: https://github.com/vuestorefront/vue-storefront/issues'
  );

  const isInstallMagento = await confirm({
    message
  });

  return isInstallMagento as boolean;
};

export default isInstallMagento;
