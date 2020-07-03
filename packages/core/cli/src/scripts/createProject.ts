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

const buildFileTargetPath = (file: string, targetPath: string, chopPhrase: string): string => targetPath + (file.replace(chopPhrase, ''));

const copyThemeFiles = (filesDir: string | Array<string>, targetPath: string, chopPhrase: string) => {
  if (fs.statSync(filesDir).isDirectory()) {
    return Promise.all(getAllFilesFromDir(filesDir as Array<string>).map(
      file => copyFile(file, buildFileTargetPath(file, targetPath, chopPhrase))
    ));
  } else {
    return copyFile(filesDir, buildFileTargetPath(filesDir as string, targetPath, chopPhrase));
  }
};

const removeDevMagicComment = (source: string): string => source.replace(/\s+(\/\/ @core-development-only-start)(.*?)(\/\/ @core-development-only-end)/sg, '');
const removeCoreDevelopmentMode = (source: string): string => source.replace(/coreDevelopment:(\s)*?true[,]?/, '');

async function createProject(integration: string, targetPath: string): Promise<void> {
  const integrationThemePath = `../../node_modules/@vue-storefront/${integration}-theme`;
  const absoluteTargetPath = path.join(__dirname, targetPath);

  const omitFiles = ['.theme', '.nuxt', 'node_modules'];
  const integrationThemeFiles = fs.readdirSync(integrationThemePath).filter(fileName => !omitFiles.includes(fileName))
    .map(directory => path.join(integrationThemePath, directory));

  log.info(`Coppying ${integration}-theme to ${targetPath}`);
  await Promise.all(
    integrationThemeFiles.map(
      absoluteDirectoryPath => copyThemeFiles(absoluteDirectoryPath, absoluteTargetPath, integrationThemePath)
    )
  );

  const agnosticThemePath = '../../node_modules/@vue-storefront/nuxt-theme/theme';
  const agnosticThemeFiles = getAllFilesFromDir(agnosticThemePath).filter(file => !file.includes(path.sep + 'static' + path.sep));

  const compileAgnosticTemplate = (filePath: string, targetPath: string, chopPhrase: string) => {
    const finalPath = buildFileTargetPath(filePath, targetPath, chopPhrase);
    if (fs.existsSync(finalPath)) {
      return;
    }
    return compileTemplate(
      path.join(__dirname, filePath),
      finalPath,
      {
        apiClient: `@vue-storefront/${integration}-api`,
        composables: `@vue-storefront/${integration}`
      });
  };

  log.info(`Coppying agnostic theme to ${targetPath}`);
  await Promise.all(agnosticThemeFiles.map(absoluteDirectoryPath => compileAgnosticTemplate(absoluteDirectoryPath, absoluteTargetPath, agnosticThemePath)));

  log.info('Updating Nuxt config');
  const nuxtConfigPath = path.join(absoluteTargetPath, 'nuxt.config.js');
  const nuxtConfig = fs.readFileSync(nuxtConfigPath, { encoding: 'utf8' });
  fs.writeFileSync(
    nuxtConfigPath,
    removeCoreDevelopmentMode(
      removeDevMagicComment(nuxtConfig)
    )
  );
}

module.exports = createProject;
createProject('commercetools', 'testbuild4');
