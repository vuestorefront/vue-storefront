const fs = require('fs');
const execa = require('execa');

if (!process.argv[2]) {
  console.error('Error: No template name provided');
  process.exit();
}

const outputPathName = process.argv[2].toLowerCase();

const vsfTuConfig = `module.exports = {
  copy: {
    to: '../template-${outputPathName}',
    from: [
      {
        path: '../../../node_modules/@vue-storefront/nuxt-theme/theme',
        ignore: [],
        variables: {
          options: {
            generate: {
              replace: {
                apiClient: '@vue-storefront/commercetools-api',
                composables: '@vue-storefront/commercetools'
              }
            }
          }
        },
        watch: false
      },
      {
        path: '.',
        ignore: ['_theme/**', 'generate-template.ts'],
        variables: {},
        watch: false
      }
    ]
  }
}`;

fs.appendFile('theme-utils.config.js', vsfTuConfig, async (err) => {
  if (err) throw err;

  try {
    await execa('vsf-tu');
    fs.unlinkSync('theme-utils.config.js');
  } catch (error) {
    console.error(error);
    process.exit();
  }
});
