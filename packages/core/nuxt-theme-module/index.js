
const consola = require('consola');
const merge = require('lodash.merge');
const defaultConfig = require('./defaultConfig').default;
const getRoutes = require('./routes');
const chalk = require('chalk');

const log = {
  info: (message) => consola.info(chalk.bold('VSF'), message),
  success: (message) => consola.success(chalk.bold('VSF'), message),
  warning: (message) => consola.warning(chalk.bold('VSF'), message),
  error: (message) => consola.error(chalk.bold('VSF'), message)
};

module.exports = async function DefaultThemeModule(moduleOptions) {
  log.info(chalk.green('Starting Theme Module'));

  moduleOptions = merge(defaultConfig, moduleOptions);
  const targetDirectory = moduleOptions.generate && moduleOptions.generate.path
    ? moduleOptions.generate.path
    : '_theme';
  const projectLocalThemeDir = this.options.buildDir.replace('.nuxt', targetDirectory);

  this.options.css = [
    ...this.options.css,
    // CSS reset stylesheet
    moduleOptions.generate
      ? `${projectLocalThemeDir}/assets/css/reset.scss`
      : 'assets/css/reset.scss'
  ];

  if (moduleOptions.routes) {
    this.extendRoutes((routes) => {
      getRoutes(moduleOptions.generate ? projectLocalThemeDir : this.options.rootDir).forEach(route => routes.unshift(route));
    });
  }

  if (moduleOptions.generate) {
    log.info('Watching changes in @vue-storefront/nuxt-theme-module and used platform theme directory');
    const generate = require('./generate').default;

    generate.call(this, {
      log,
      moduleOptions,
      projectLocalThemeDir,
      targetDirectory
    });
  }
};
