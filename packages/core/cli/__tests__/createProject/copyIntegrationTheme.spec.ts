import copyIntegrationTheme from '../../src/scripts/createProject/copyIntegrationTheme';

const themeFiles = {
  pages: [
    'pages/Home.vue'
  ],
  components: [
    'components/Button.vue',
    'components/Avatar.vue'
  ],
  assets: [
    'assets/logo.svg'
  ],
  plugins: [
    'plugins/axios.js'
  ],
  '.theme': [
    'someMock.js'
  ],

  'nuxt.config.js': null,
  'package.json': null
};

const integration = 'magento-2';
const targetPath = '../../my-new-super-project/';

const flatArray = (arr) => arr.reduce((flat, next) => flat.concat(Array.isArray(next) ? flatArray(next) : next), []);

jest.mock('@vue-storefront/cli/src/utils/helpers', () => ({
  getThemePath: () => '',
  buildFileTargetPath: (file: string, targetPath: string, chopPhrase: string): string => targetPath + (file.replace(chopPhrase, ''))
}));

jest.mock('@vue-storefront/nuxt-theme/scripts/getAllFilesFromDir', () => (dir) => {
  const correspondingKey = Object.keys(themeFiles).find(directory => dir.endsWith(directory));
  return correspondingKey ? themeFiles[correspondingKey].map(file => file) : [];
});

jest.mock('fs', () => ({
  readdirSync: () => Object.keys(themeFiles),
  statSync: (filePath: string) => ({
    // doesnt end with .[2-4chars]
    isDirectory: () => !(/\.[a-z0-9]{2,4}$/.test(filePath))
  })
}));

jest.mock('path', () => ({
  join: (a, b) => b
}));

const { copyFile } = require('@vue-storefront/nuxt-theme/scripts/copyThemeFiles');
jest.mock('@vue-storefront/nuxt-theme/scripts/copyThemeFiles', () => ({
  copyFile: jest.fn()
}));

describe('[vsf-next-cli] copyIntegrationTheme', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('copies files from integration theme', async () => {
    const filesInDirs = flatArray(Object.values(themeFiles)).filter(v => Boolean(v));
    const filesInRoot = Object.entries(themeFiles).filter(([, value]) => !value).map(([key]) => key);

    await copyIntegrationTheme(integration, targetPath);

    for (const file of [...filesInDirs, ...filesInRoot]) {
      expect(copyFile).toHaveBeenCalledWith(file, targetPath + file);
    }
  });

  it('omits not wanted directories from root of integration theme', async () => {

    const omitFiles = ['pages', 'package.json'];
    const filesInDirs = flatArray(Object.values(themeFiles)).filter(themeFile => Boolean(themeFile));
    const filesInRoot = Object.entries(themeFiles).filter(([, value]) => !value).map(([key]) => key);
    const allFiles = [...filesInDirs, ...filesInRoot];
    const filteredFilesInDirs = allFiles.filter(themeFile => !omitFiles.some(omitFile => themeFile.startsWith(omitFile)));
    const ommitedFiles = allFiles.filter(themeFile => omitFiles.some(omitFile => themeFile.startsWith(omitFile)));

    await copyIntegrationTheme(integration, targetPath, omitFiles);

    for (const file of filteredFilesInDirs) {
      expect(copyFile).toHaveBeenCalledWith(file, targetPath + file);
    }
    for (const file of ommitedFiles) {
      expect(copyFile).not.toHaveBeenCalledWith(file, targetPath + file);
    }
  });
});
