import path from 'path';
import log from '@vue-storefront/cli/src/utils/log';
import copyIntegrationTheme from '@vue-storefront/cli/src/scripts/createProject/copyIntegrationTheme';
import copyAgnosticTheme from '@vue-storefront/cli/src/scripts/createProject/copyAgnosticTheme';
import removeMagicCommentsFromFile from '@vue-storefront/cli/src/scripts/createProject/removeMagicCommentsFromFile';
import uncommentProjectOnly from '@vue-storefront/cli/src/scripts/createProject/uncommentProjectOnly';

async function createProject(integration: string, targetPath: string): Promise<void> {

  log.info(`Coppying ${integration}-theme to ${targetPath}`);
  await copyIntegrationTheme(integration, targetPath, ['.theme', '.nuxt', 'node_modules']);

  log.info(`Coppying agnostic theme to ${targetPath}`);
  await copyAgnosticTheme(integration, targetPath);

  log.info('Updating Nuxt config');
  const absoluteTargetPath = path.join(__dirname, targetPath);
  const nuxtConfigPath = path.join(absoluteTargetPath, 'nuxt.config.js');
  await removeMagicCommentsFromFile(nuxtConfigPath);
  await uncommentProjectOnly(nuxtConfigPath);
}

export default createProject;
