const path = require('path');
const fs = require('fs');
const consola = require('consola');
const chalk = require('chalk');
const chokidar = require('chokidar');
const compileTemplate = require('./scripts/compileTemplate');
const { copyThemeFile, copyThemeFiles } = require('./scripts/copyThemeFiles');
const getAllFilesFromDir = require('./scripts/getAllFilesFromDir');
const getAllSubDirs = require('./scripts/getAllSubDirs');

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

  const omittedDirectories = [
    '.theme',
    '.nuxt',
    'node_modules',
    'test'
  ];

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
  const themeDirectoriesPaths = [];
  const copyThemeDirectoriesPromises = [];

  for (const directory of getAllSubDirs(this.options.rootDir)) {
    if (!omittedDirectories.includes(directory)) {
      const absolutePath = path.join(this.options.rootDir, directory);
      themeDirectoriesPaths.push(absolutePath);
      copyThemeDirectoriesPromises.push(copyThemeFiles(absolutePath));
    }
  }

  await Promise.all(themeFiles.map(path => compileAgnosticTemplate(path)));
  await Promise.all(copyThemeDirectoriesPromises);

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

  this.extendRoutes((routes, resolve) => {
    routes.unshift({
      name: 'home',
      path: '/',
      component: resolve(projectLocalThemeDir, 'pages/Home.vue')
    });
    routes.push({
      name: 'product',
      path: '/p/:id/:slug/',
      component: resolve(projectLocalThemeDir, 'pages/Product.vue')
    });
    routes.push({
      name: 'category',
      path: '/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
      component: resolve(projectLocalThemeDir, 'pages/Category.vue')
    });
    routes.push({
      name: 'my-account',
      path: '/my-account/:pageName?',
      component: resolve(projectLocalThemeDir, 'pages/MyAccount.vue')
    });
    routes.push({
      name: 'checkout',
      path: '/checkout',
      component: resolve(projectLocalThemeDir, 'pages/Checkout.vue'),
      children: [
        {
          path: 'personal-details',
          name: 'personal-details',
          component: resolve(projectLocalThemeDir, 'pages/Checkout/PersonalDetails.vue')
        },
        {
          path: 'shipping',
          name: 'shipping',
          component: resolve(projectLocalThemeDir, 'pages/Checkout/Shipping.vue')
        },
        {
          path: 'payment',
          name: 'payment',
          component: resolve(projectLocalThemeDir, 'pages/Checkout/Payment.vue')
        },
        {
          path: 'order-review',
          name: 'order-review',
          component: resolve(projectLocalThemeDir, 'pages/Checkout/OrderReview.vue')
        },
        {
          path: 'thank-you',
          name: 'thank-you',
          component: resolve(projectLocalThemeDir, 'pages/Checkout/ThankYou.vue')
        }
      ]
    });
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

    chokidar.watch(themeDirectoriesPaths, { ignoreInitial: true })
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
