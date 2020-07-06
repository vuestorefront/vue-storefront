import * as path from 'path';
import log from '../../utils/log';
import copyIntegrationTheme from './copyIntegrationTheme';
import copyAgnosticTheme from './copyAgnosticTheme';
import removeMagicCommentsFromFile from './removeMagicCommentsFromFile';

async function createProject(integration: string, targetPath: string): Promise<void> {

  log.info(`Coppying ${integration}-theme to ${targetPath}`);
  await copyIntegrationTheme(integration, targetPath, ['.theme', '.nuxt', 'node_modules']);

  log.info(`Coppying agnostic theme to ${targetPath}`);
  await copyAgnosticTheme(integration, targetPath);

  log.info('Updating Nuxt config');
  const absoluteTargetPath = path.join(__dirname, targetPath);
  const nuxtConfigPath = path.join(absoluteTargetPath, 'nuxt.config.js');
  await removeMagicCommentsFromFile(nuxtConfigPath);
}

export default createProject;
createProject('commercetools', 'testbuild4');
