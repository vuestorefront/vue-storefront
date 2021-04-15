const fs = require('fs');
const execa = require('execa');

export default async (args) => {
  if (!args[0]) {
    console.error('Error: No output folder provided');
    process.exit(1);
  }

  const outputPathName = args[0].toLowerCase();

  const vsfTuConfig = `module.exports = {
  copy: {
    to: '${outputPathName}',
    from: [
      {
        path: '@vue-storefront/nuxt-theme/theme',
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
        path: '${args[1] || '.'}',
        ignore: ['_theme/**', 'generate-template.ts', 'theme-utils.config.js', ],
        variables: {},
        watch: false
      }
    ]
  }
}`;

  const configFileName = 'theme-utils.config.js;';

  if (fs.existsSync(configFileName)) {
    fs.unlinkSync(configFileName);
  }

  fs.appendFile('', vsfTuConfig, async (err) => {
    if (err) throw err;

    try {
      await execa('vsf-tu');
      fs.unlinkSync('theme-utils.config.js');
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });
};
