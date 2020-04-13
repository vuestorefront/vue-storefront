const path = require('path');
const fs = require('fs');
const consola = require('consola');
const chalk = require('chalk');
const chokidar = require('chokidar');
const compileTemplates = require('./compileTemplates.js');
const copyThemeFiles = require('./copyThemeFiles.js');

const log = {
  info: (message) => consola.info(chalk.bold('VSF'), message),
  success: (message) => consola.success(chalk.bold('VSF'), message),
  warning: (message) => consola.warning(chalk.bold('VSF'), message),
  error: (message) => consola.error(chalk.bold('VSF'), message)
};

const getAllFiles = (dirPath, arrayOfFiles) => {
  arrayOfFiles = arrayOfFiles || [];
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push((dirPath + '/' + file).split(__dirname + '/').pop());
    }
  });

  return arrayOfFiles;
};

module.exports = function DefaultThemeModule(moduleOptions) {
  log.info(chalk.green('Starting Theme Module'));
  const themeFiles = getAllFiles(path.join(__dirname, 'theme')).filter(file => !file.includes('/static/'));
  const projectLocalThemeDir = this.options.buildDir.replace('.nuxt', '.theme');
  const themeComponentsDir = path.join(this.options.rootDir, 'pages');
  const themePagesDir = path.join(this.options.rootDir, 'components');

  const compileAgnosticTemplates = () => {
    themeFiles.forEach((file) => {
      compileTemplates(
        path.join(__dirname, file),
        this.options.buildDir.split('.nuxt').pop() + '.theme/' + file.split('theme/').pop(),
        {
          apiClient: moduleOptions.apiClient,
          helpers: moduleOptions.helpers,
          composables: moduleOptions.composables
        }
      );
    });
  };

  log.info('Adding theme files...');

  compileAgnosticTemplates();
  copyThemeFiles(themeComponentsDir);
  copyThemeFiles(themePagesDir);

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

  log.success(`Added ${themeFiles.length} theme file(s) to ${chalk.bold('.theme')} folder`);

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
    log.info('Watching changes in @vue-storefront/nuxt-theme');
    chokidar.watch(path.join(__dirname, '/theme/')).on('all', () => {
      // TODO: Compile only the template that has changed
      compileAgnosticTemplates();
    });
    chokidar.watch(themeComponentsDir).on('all', () => {
      copyThemeFiles(themeComponentsDir);
    });
    chokidar.watch(themePagesDir).on('all', () => {
      copyThemeFiles(themePagesDir);
    });
  }
};
