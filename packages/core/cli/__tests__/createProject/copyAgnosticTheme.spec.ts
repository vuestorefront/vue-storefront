import copyAgnosticTheme from '../../src/scripts/createProject/copyAgnosticTheme';

const themePath = '/home/somepath';
const NOT_EXISTING_PATH = 'not-existing-path-test';
const files = [
  '/home/somepath/nuxt.config.js',
  '/home/somepath/package.json',
  '/home/somepath/components',
  '/home/somepath/pages',
  '/home/somepath/assets',
  '/home/somepath/helpers',
  '/home/somepath/plugins',
  '/home/somepath/middleware',
  `/home/somepath/${NOT_EXISTING_PATH}`
];

jest.mock('@vue-storefront/cli/src/utils/helpers', () => ({
  getThemePath: () => themePath,
  buildFileTargetPath: (file: string, targetPath: string, chopPhrase: string): string => targetPath + (file.replace(chopPhrase, ''))
}));

jest.mock('@vue-storefront/nuxt-theme/scripts/getAllFilesFromDir', () => () => files);

const compileTemplateMock = require('@vue-storefront/nuxt-theme/scripts/compileTemplate');
jest.mock('@vue-storefront/nuxt-theme/scripts/compileTemplate', () => jest.fn());

jest.mock('fs', () => ({
  existsSync: (finalPath) => finalPath.endsWith(NOT_EXISTING_PATH)
}));

describe('[vsf-next-cli] copyAgnosticTheme', () => {
  it('compiles & copies template with proper arguments', async () => {

    const integration = 'magento-2';
    const targetPath = '../../my-new-super-project';

    await copyAgnosticTheme(integration, targetPath);
    for (const file of files) {
      expect(compileTemplateMock).not.toHaveBeenCalledWith(
        file,
        targetPath,
        {
          apiClient: `@vue-storefront/${integration}-api`,
          composables: `@vue-storefront/${integration}`
        }
      );
    }
  });
});
