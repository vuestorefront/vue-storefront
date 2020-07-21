const path = require('path');
const fs = require('fs');
const consola = require('consola');
const chalk = require('chalk');
const chokidar = require('chokidar');
const compileTemplate = require('./scripts/compileTemplate');
const { copyThemeFile, copyThemeFiles } = require('./scripts/copyThemeFiles');
const getAllFilesFromDir = require('./scripts/getAllFilesFromDir');
const getRoutes = require('./routes');
const getAllSubDirs = require('./scripts/getAllSubDirs');

const log = {
  info: (message) => consola.info(chalk.bold('VSF'), message),
  success: (message) => consola.success(chalk.bold('VSF'), message),
  warning: (message) => consola.warning(chalk.bold('VSF'), message),
  error: (message) => consola.error(chalk.bold('VSF'), message)
};

module.exports = async function DefaultThemeModule(moduleOptions) {
  log.info(chalk.green('Starting Theme Module'));

  const agnosticThemeDir = path.join(__dirname, 'theme');
  const projectLocalThemeDir = this.options.buildDir.replace('.nuxt', '.theme');

  const agnosticThemeFiles = getAllFilesFromDir(agnosticThemeDir).filter(file => !file.includes(path.sep + 'static' + path.sep));

  const compileAgnosticTemplate = (filePath) => {
    return compileTemplate(
      path.join(__dirname, filePath),
      this.options.buildDir.split('.nuxt').pop() + '.theme' + path.sep + filePath.split('theme' + path.sep).pop(),
      {
        apiClient: moduleOptions.apiClient,
        helpers: moduleOptions.helpers,
        composables: moduleOptions.composables
      });
  };

  log.info('Adding theme files...');

  const themeDirectoriesPaths = getAllSubDirs(this.options.rootDir, ['.theme', '.nuxt', 'node_modules', 'test'])
    .map(directory => path.join(this.options.rootDir, directory));

  await Promise.all(agnosticThemeFiles.map(path => compileAgnosticTemplate(path)));
  await Promise.all(themeDirectoriesPaths.map(absolutePath => copyThemeFiles(absolutePath)));

  log.success(`Added ${agnosticThemeFiles.length} theme file(s) to ${chalk.bold('.theme')} folder`);

  this.options.dir = {
    ...this.options.dir,
    ...{
      layouts: '.theme/layouts',
      assets: '.theme/assets',
      pages: '.theme/pages'
    }};

  this.options.css = [
    ...this.options.css,
    // CSS reset stylesheet
    '.theme/assets/css/reset.scss'
  ];

  this.extendBuild(config => {
    delete config.resolve.alias['~'];
    config.resolve.alias['~/components'] = path.join(projectLocalThemeDir, '/components');
    config.resolve.alias['~/assets'] = path.join(projectLocalThemeDir, '/assets');
    config.resolve.alias['~'] = path.join(projectLocalThemeDir);
  });

  this.extendRoutes((routes) => {
    getRoutes(projectLocalThemeDir).forEach(route => routes.unshift(route));
  });

  if (global.coreDev) {
    log.info('Watching changes in @vue-storefront/nuxt-theme and used platform theme directory');

    chokidar.watch(agnosticThemeDir, { ignoreInitial: true }).on('all', (event, baseFilePath) => {
      const overwriteFilePath = baseFilePath.replace(agnosticThemeDir, this.options.rootDir);

      if (event === 'add' || event === 'change') {
        if (!fs.existsSync(overwriteFilePath)) {
          compileAgnosticTemplate(baseFilePath.replace(__dirname, ''));
        }
      } else if (event === 'unlink') {
        if (!fs.existsSync(overwriteFilePath)) {
          fs.unlinkSync(baseFilePath.replace(agnosticThemeDir, projectLocalThemeDir));
        }
      }
    });

    chokidar.watch(themeDirectoriesPaths, { ignoreInitial: true })
      .on('all', (event, filePath) => {
        if (event === 'unlink') {
          const baseFilePath = filePath.replace(this.options.rootDir, agnosticThemeDir);
          if (fs.existsSync(baseFilePath)) {
            compileAgnosticTemplate(baseFilePath.replace(__dirname, ''));
          } else {
            fs.unlinkSync(filePath.replace(this.options.rootDir, projectLocalThemeDir));
          }
        } else if (event === 'add' || event === 'change') {
          copyThemeFile(filePath);
        }
      });
  }
};
