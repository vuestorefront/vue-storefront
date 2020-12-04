import path from 'path';
import log from '../../utils/log';
import copyIntegrationTheme from './copyIntegrationTheme';
import copyAgnosticTheme from './copyAgnosticTheme';
import processMagicComments from './processMagicComments';

async function createProject(integration: string, targetPath: string): Promise<void> {

  log.info(`Coppying agnostic theme to ${targetPath}`);
  await copyAgnosticTheme(integration, targetPath);

  log.info(`Coppying ${integration}-theme to ${targetPath}`);
  await copyIntegrationTheme(integration, targetPath, ['_theme', '.nuxt', 'node_modules']);

  log.info('Updating Nuxt config');
  const absoluteTargetPath = path.isAbsolute(targetPath)
    ? targetPath
    : path.join(__dirname, targetPath);
  const nuxtConfigPath = path.join(absoluteTargetPath, 'nuxt.config.js');
  await processMagicComments(nuxtConfigPath);
}

export default createProject;
