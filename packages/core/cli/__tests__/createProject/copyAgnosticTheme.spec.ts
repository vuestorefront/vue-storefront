import copyAgnosticTheme from '../../src/scripts/createProject/copyAgnosticTheme';

const path = require('path');

const themePath = '/home/somepath';
const files = [
  '/home/somepath/nuxt.config.js',
  '/home/somepath/package.json',
  '/home/somepath/components',
  '/home/somepath/pages',
  '/home/somepath/assets',
  '/home/somepath/helpers',
  '/home/somepath/plugins',
  '/home/somepath/middleware'
];

jest.mock('@vue-storefront/cli/src/utils/helpers', () => ({
  getThemePath: () => themePath,
  buildFileTargetPath: (file: string, targetPath: string, chopPhrase: string): string => targetPath + (file.replace(chopPhrase, ''))
}));

jest.mock('@vue-storefront/nuxt-theme/scripts/getAllFilesFromDir', () => () => files);

const compileTemplateMock = require('@vue-storefront/nuxt-theme/scripts/compileTemplate');
jest.mock('@vue-storefront/nuxt-theme/scripts/compileTemplate', () => jest.fn());

jest.mock('fs', () => ({
  existsSync: () => false
}));

describe('[vsf-next-cli] copyAgnosticTheme', () => {
  it('compiles & copies template with proper arguments', async () => {

    const integration = 'magento-2';
    const targetPath = '../../my-new-super-project';

    await copyAgnosticTheme(integration, targetPath);
    for (const file of files) {
      expect(compileTemplateMock).toHaveBeenCalledWith(
        path.join(path.resolve('./src/scripts/createProject'), file),
        path.join(path.resolve('./src/scripts/createProject'), targetPath, file.replace(themePath, '')),
        {
          apiClient: `@vue-storefront/${integration}-api`,
          composables: `@vue-storefront/${integration}`
        }
      );
    }
  });
});
