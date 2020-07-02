const compileTemplate = require('@vue-storefront/nuxt-theme/scripts/compileTemplate');
const getAllFilesFromDir = require('@vue-storefront/nuxt-theme/scripts/getAllFilesFromDir.js');
const getAllSubDirs = require('@vue-storefront/nuxt-theme/scripts/getAllSubDirs.js');
const { copyFile } = require('@vue-storefront/nuxt-theme/scripts/copyThemeFiles');
const consola = require('consola');
const chalk = require('chalk');

const fs = require('fs');
const path = require('path');

const log = {
  info: (message) => consola.info(chalk.bold('VSF'), message),
  success: (message) => consola.success(chalk.bold('VSF'), message),
  warning: (message) => consola.warning(chalk.bold('VSF'), message),
  error: (message) => consola.error(chalk.bold('VSF'), message)
};

function copyThemeFile(file, targetPath, chopPhrase, ifNotExist = false) {
  const finalPath = targetPath + (file.replace(chopPhrase, ''));
  if (ifNotExist) {
    // Check if file exist
    // if so -> return
    if (fs.existsSync(finalPath)) {
      // console.log(finalPath, 'already exists')
      return;
    }
  }
  return copyFile(file, finalPath);
}

function copyThemeFiles(filesDir, targetPath, chopPhrase, ifNotExist = false) {
  return Promise.all(getAllFilesFromDir(filesDir).map(
    file => copyThemeFile(file, targetPath, chopPhrase, ifNotExist)
  ));
}

async function createProject(integration: string, targetPath: string): Promise<void> {
  const integrationThemePath = `../../node_modules/@vue-storefront/${integration}-theme`;
  const absoluteTargetPath = path.join(__dirname, targetPath);

  const integrationThemeDirectoriesPaths = getAllSubDirs(integrationThemePath, ['.theme', '.nuxt', 'node_modules'])
    .map(directory => path.join(integrationThemePath, directory));

  log.info(`Coppying ${integration}-theme to ${targetPath}`);
  await Promise.all(integrationThemeDirectoriesPaths.map(absoluteDirectoryPath => copyThemeFiles(absoluteDirectoryPath, absoluteTargetPath, integrationThemePath)));

  const agnosticThemePath = '../../node_modules/@vue-storefront/nuxt-theme/theme';
  const agnosticThemeDirectoriesPaths = getAllSubDirs(agnosticThemePath)
    .map(directory => path.join(agnosticThemePath, directory));

  log.info(`Coppying agnostic theme to ${targetPath}`);
  await Promise.all(agnosticThemeDirectoriesPaths.map(absoluteDirectoryPath => copyThemeFiles(absoluteDirectoryPath, absoluteTargetPath, agnosticThemePath, true)));

}

module.exports = compileTemplate;
createProject('commercetools', 'testbuild');
