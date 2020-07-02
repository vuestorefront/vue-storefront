const compileTemplate = require('@vue-storefront/nuxt-theme/scripts/compileTemplate');
const getAllFilesFromDir = require('@vue-storefront/nuxt-theme/scripts/getAllFilesFromDir.js');
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
  if (fs.statSync(filesDir).isDirectory()) {
    return Promise.all(getAllFilesFromDir(filesDir).map(
      file => copyThemeFile(file, targetPath, chopPhrase, ifNotExist)
    ));
  } else {
    return copyThemeFile(filesDir, targetPath, chopPhrase, ifNotExist);
  }
}

async function createProject(integration: string, targetPath: string): Promise<void> {
  const integrationThemePath = `../../node_modules/@vue-storefront/${integration}-theme`;
  const absoluteTargetPath = path.join(__dirname, targetPath);

  const omitFiles = ['.theme', '.nuxt', 'node_modules'];
  const integrationThemeFiles = fs.readdirSync(integrationThemePath).filter(fileName => !omitFiles.includes(fileName))
    .map(directory => path.join(integrationThemePath, directory));

  log.info(`Coppying ${integration}-theme to ${targetPath}`);
  await Promise.all(integrationThemeFiles.map(absoluteDirectoryPath => copyThemeFiles(absoluteDirectoryPath, absoluteTargetPath, integrationThemePath)));

  const agnosticThemePath = '../../node_modules/@vue-storefront/nuxt-theme/theme';
  const agnosticThemeFiles = fs.readdirSync(agnosticThemePath).filter(fileName => !omitFiles.includes(fileName))
    .map(directory => path.join(agnosticThemePath, directory));

  log.info(`Coppying agnostic theme to ${targetPath}`);
  await Promise.all(agnosticThemeFiles.map(absoluteDirectoryPath => copyThemeFiles(absoluteDirectoryPath, absoluteTargetPath, agnosticThemePath, true)));

  log.info('Updating Nuxt config');
  const nuxtConfigPath = path.join(absoluteTargetPath, 'nuxt.config.js');
  const nuxtConfig = fs.readFileSync(nuxtConfigPath, { encoding: 'utf8' });
  fs.writeFileSync(
    nuxtConfigPath,
    nuxtConfig.replace(/\s+(\/\/ @core-development-only-start)(.*?)(\/\/ @core-development-only-end)/sg, '')
      .replace(/coreDevelopment:(\s)*?true[,]?/, '')
  );
}

module.exports = compileTemplate;
createProject('boilerplate', 'testbuild3');
