const path = require('path');
const fs = require('fs');
const consola = require('consola');
const chalk = require('chalk');
const chokidar = require('chokidar');
const merge = require('lodash.merge');
const defaultConfig = require('./defaultConfig').default;
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

  moduleOptions = merge(defaultConfig, moduleOptions);

  const agnosticThemeDir = path.join(__dirname, 'theme');
  const targetDirectory = moduleOptions.generate && moduleOptions.generate.path
    ? moduleOptions.generate.path
    : '.theme';

  const compileAgnosticTemplate = (filePath) => {
    return compileTemplate(
      path.join(__dirname, filePath),
      this.options.buildDir.split('.nuxt').pop() + targetDirectory + path.sep + filePath.split('theme' + path.sep).pop(),
      {
        generate: {
          replace: {
            apiClient: moduleOptions.generate.replace.apiClient,
            composables: moduleOptions.generate.replace.composables
          }
        }
      });
  };
  let projectLocalThemeDir;
  let themeDirectoriesPaths;

  if (moduleOptions.generate) {
    projectLocalThemeDir = this.options.buildDir.replace('.nuxt', targetDirectory);
    const agnosticThemeFiles = getAllFilesFromDir(agnosticThemeDir).filter(file => !file.includes(path.sep + 'static' + path.sep));

    log.info('Adding theme files...');

    themeDirectoriesPaths = getAllSubDirs(this.options.rootDir, [targetDirectory, '.nuxt', 'node_modules', 'test'])
      .map(directory => path.join(this.options.rootDir, directory));

    await Promise.all(agnosticThemeFiles.map(path => compileAgnosticTemplate(path)));
    await Promise.all(themeDirectoriesPaths.map(absolutePath => copyThemeFiles(absolutePath)));

    log.success(`Added ${agnosticThemeFiles.length} theme file(s) to ${chalk.bold(targetDirectory)} folder`);

    this.options.dir = {
      ...this.options.dir,
      ...{
        layouts: `${targetDirectory}/layouts`,
        assets: `${targetDirectory}/assets`,
        pages: `${targetDirectory}/pages`
      }};

    this.extendBuild(config => {
      delete config.resolve.alias['~'];
      config.resolve.alias['~/components'] = path.join(projectLocalThemeDir, '/components');
      config.resolve.alias['~/assets'] = path.join(projectLocalThemeDir, '/assets');
      config.resolve.alias['~'] = path.join(projectLocalThemeDir);
    });

  }

  this.options.css = [
    ...this.options.css,
    // CSS reset stylesheet
    moduleOptions.generate
      ? `${projectLocalThemeDir}/assets/css/reset.scss`
      : 'assets/css/reset.scss'
  ];

  if (moduleOptions && moduleOptions.routes) {
    // routes default = true
    this.extendRoutes((routes) => {
      getRoutes(moduleOptions.generate ? projectLocalThemeDir : this.options.rootDir).forEach(route => routes.unshift(route));
    });
  }

  if (moduleOptions.generate) {
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
