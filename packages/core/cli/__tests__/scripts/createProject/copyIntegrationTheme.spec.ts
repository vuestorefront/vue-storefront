import copyIntegrationTheme from '@vue-storefront/cli/src/scripts/createProject/copyIntegrationTheme';
import { copyThemeFiles } from '@vue-storefront/cli/src/utils/helpers';

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

jest.mock('@vue-storefront/cli/src/utils/helpers', () => ({
  getDependencyPath: () => '',
  buildFileTargetPath: (file: string, targetPath: string, chopPhrase: string): string => targetPath + (file.replace(chopPhrase, '')),
  copyThemeFiles: jest.fn()
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

import path from 'path';
jest.mock('path', () => ({
  join: (_, file) => file,
  isAbsolute: jest.fn(() => false)
}));

const absoluteTargetPath = '/home/thecreator/abs';

describe('[vsf-next-cli] copyIntegrationTheme', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('copies files from integration theme to relative path', async () => {
    await copyIntegrationTheme(integration, targetPath);

    for (const file of Object.keys(themeFiles)) {
      expect(copyThemeFiles).toHaveBeenCalledWith(file, targetPath, '');
    }
  });

  it('copies files from integration theme to absolute path', async () => {
    (path.isAbsolute as jest.Mock).mockImplementation(() => true);

    await copyIntegrationTheme(integration, absoluteTargetPath);

    for (const file of Object.keys(themeFiles)) {
      expect(copyThemeFiles).toHaveBeenCalledWith(file, absoluteTargetPath, '');
    }
  });
});
