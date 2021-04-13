const fs = require('fs');
const execa = require('execa');

enum MODE_ENUM {
  LOCAL = 0,
  EXTERNAL = 1
}

if (!process.argv[2]) {
  console.error('Error: No template name provided');
  process.exit();
}

const setMode = () => {
  switch (`${process.argv[3]}`.toLowerCase()) {
    case '--dir':
      return MODE_ENUM.LOCAL;
    case '--git':
      return MODE_ENUM.EXTERNAL;
    default:
      return MODE_ENUM.LOCAL;
  }
};

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
        ignore: ['_theme/*', 'node_modules', '.nuxt', 'generate-template.ts'],
        variables: {},
        watch: false
      }
    ]
  }
}`;

const generateTemplate = () => {
  fs.appendFile('theme-utils.config.js', vsfTuConfig, async (err) => {
    if (err) throw err;

    try {
      await execa('vsf-tu');
      fs.unlinkSync('theme-utils.config.js');
    } catch (err) {
      console.error(err);
      process.exit();
    }
  });
};

generateTemplate();
