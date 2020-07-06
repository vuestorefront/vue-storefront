const path = require('path');
const log = require('@vue-storefront/cli/src/utils/log');
const copyIntegrationTheme = require('@vue-storefront/cli/src/scripts/createProject/copyIntegrationTheme');
const copyAgnosticTheme = require('@vue-storefront/cli/src/scripts/createProject/copyAgnosticTheme');
const removeMagicCommentsFromFile = require('@vue-storefront/cli/src/scripts/createProject/removeMagicCommentsFromFile');

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

module.exports = createProject;
createProject('commercetools', 'testbuild4');
