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
    if (fs.existsSync(finalPath)) {
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
  const agnosticThemeCompilableFiles = getAllFilesFromDir(agnosticThemePath).filter(file => !file.includes(path.sep + 'static' + path.sep));

  const compileAgnosticTemplate = (filePath, targetPath, chopPhrase, ifNotExist = false) => {
    const finalPath = targetPath + (filePath.replace(chopPhrase, ''));
    if (ifNotExist) {
      if (fs.existsSync(finalPath)) {
        return;
      }
    }
    return compileTemplate(
      path.join(__dirname, filePath),
      finalPath,
      {
        apiClient: `@vue-storefront/${integration}-api`,
        // helpers: moduleOptions.helpers,
        composables: `@vue-storefront/${integration}`
      });
  };

  log.info(`Coppying agnostic theme to ${targetPath}`);
  await Promise.all(agnosticThemeCompilableFiles.map(absoluteDirectoryPath => compileAgnosticTemplate(absoluteDirectoryPath, absoluteTargetPath, agnosticThemePath, true)));

  log.info('Updating Nuxt config');
  const nuxtConfigPath = path.join(absoluteTargetPath, 'nuxt.config.js');
  const nuxtConfig = fs.readFileSync(nuxtConfigPath, { encoding: 'utf8' });
  fs.writeFileSync(
    nuxtConfigPath,
    nuxtConfig
      .replace(/\s+(\/\/ @core-development-only-start)(.*?)(\/\/ @core-development-only-end)/sg, '')
      .replace(/coreDevelopment:(\s)*?true[,]?/, '')
  );
}

module.exports = createProject;
createProject('boilerplate', 'testbuild3');
