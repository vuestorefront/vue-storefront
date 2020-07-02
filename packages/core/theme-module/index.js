const path = require('path');
const fs = require('fs');
const consola = require('consola');
const chalk = require('chalk');
const chokidar = require('chokidar');
const compileTemplate = require('./scripts/compileTemplate');
const { copyThemeFile, copyThemeFiles } = require('./scripts/copyThemeFiles');
const getAllFilesFromDir = require('./scripts/getAllFilesFromDir');
const getRoutes = require('./routes')
;
const log = {
  info: (message) => consola.info(chalk.bold('VSF'), message),
  success: (message) => consola.success(chalk.bold('VSF'), message),
  warning: (message) => consola.warning(chalk.bold('VSF'), message),
  error: (message) => consola.error(chalk.bold('VSF'), message)
};

module.exports = async function DefaultThemeModule(moduleOptions) {
  log.info(chalk.green('Starting Theme Module'));

  const baseThemeDir = path.join(__dirname, 'theme');
  const projectLocalThemeDir = this.options.buildDir.replace('.nuxt', '.theme');
  const themeComponentsDir = path.join(this.options.rootDir, 'pages');
  const themePagesDir = path.join(this.options.rootDir, 'components');
  const themeHelpersDir = path.join(this.options.rootDir, 'helpers');
  const themeFiles = getAllFilesFromDir(baseThemeDir).filter(file => !file.includes(path.sep + 'static' + path.sep));

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

  await Promise.all(themeFiles.map(path => compileAgnosticTemplate(path)));
  await Promise.all([
    copyThemeFiles(themeComponentsDir),
    copyThemeFiles(themePagesDir),
    copyThemeFiles(themeHelpersDir)
  ]);

  log.success(`Added ${themeFiles.length} theme file(s) to ${chalk.bold('.theme')} folder`);

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

    chokidar.watch(baseThemeDir, { ignoreInitial: true }).on('all', (event, baseFilePath) => {
      const overwriteFilePath = baseFilePath.replace(baseThemeDir, this.options.rootDir);

      if (event === 'add' || event === 'change') {
        if (!fs.existsSync(overwriteFilePath)) {
          compileAgnosticTemplate(baseFilePath.replace(__dirname, ''));
        }
      } else if (event === 'unlink') {
        if (!fs.existsSync(overwriteFilePath)) {
          fs.unlinkSync(baseFilePath.replace(baseThemeDir, projectLocalThemeDir));
        }
      }
    });

    chokidar.watch([themeComponentsDir, themePagesDir, themeHelpersDir], { ignoreInitial: true })
      .on('all', (event, filePath) => {
        if (event === 'unlink') {
          const baseFilePath = filePath.replace(this.options.rootDir, baseThemeDir);
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
