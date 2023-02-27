import { confirm } from '@clack/prompts';

/** Prompt user if they want to install Magento 2 locally. */
const isInstallMagento = async (message: string): Promise<boolean> => {
  const isInstallMagento = await confirm({
    message
  });

  return isInstallMagento as boolean;
};

export default isInstallMagento;
