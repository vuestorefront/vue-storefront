import log from '@vue-storefront/cli/src/utils/log';
import { processMagicCommentsInNuxtConfig } from '@vue-storefront/cli/src/scripts/createTemplate/processMagicCommentsInNuxtConfig';
import { removeFolder } from '@vue-storefront/cli/src/utils/removeFolder';
import { processTemplate } from '@vue-storefront/cli/src/scripts/createTemplate/processTemplate';
const execa = require('execa');
const fs = require('fs');

vi.mock('@vue-storefront/cli/src/utils/log', () => ({
  __esModule: true,
  default: {
    error: vi.fn((text: string) => text)
  }
}));

vi.mock(
  '@vue-storefront/cli/src/scripts/createTemplate/processMagicCommentsInNuxtConfig',
  () => ({
    processMagicCommentsInNuxtConfig: vi.fn()
  })
);

vi.mock('fs', () => ({
  unlinkSync: vi.fn()
}));

vi.mock('execa', () => vi.fn());

vi.mock('@vue-storefront/cli/src/utils/removeFolder', () => ({
  removeFolder: vi.fn()
}));

describe('[@core/cli/scripts] Process Template', () => {
  it('should invoke all functions and pass happy way', async () => {
    const vsfTuConfigFilePath = '/home/root/test/nuxt.config.js';
    const generatedTemplatePath = '/home/root/test';

    await processTemplate({ vsfTuConfigFilePath, generatedTemplatePath });

    expect(fs.unlinkSync).toHaveBeenCalledWith(vsfTuConfigFilePath);
    expect(execa).toHaveBeenCalledWith(expect.any(String));
    expect(processMagicCommentsInNuxtConfig).toHaveBeenCalledWith(
      generatedTemplatePath
    );
  });

  it('should log when vsf-tu script fail', async () => {
    const exacaMock = execa as vi.Mock;
    exacaMock.mockImplementation(() => {
      throw new Error();
    });
    const vsfTuConfigFilePath = '/home/root/test/nuxt.config.js';
    const generatedTemplatePath = '/home/root/test';

    await processTemplate({ vsfTuConfigFilePath, generatedTemplatePath });

    expect(log.error).toHaveBeenCalledWith(expect.any(String));
  });

  it('should log when removing config file fail', async () => {
    const removeFile = fs.unlinkSync as vi.Mock;
    removeFile.mockImplementation(() => {
      throw new Error();
    });
    const vsfTuConfigFilePath = '/home/root/test/nuxt.config.js';
    const generatedTemplatePath = '/home/root/test';

    await processTemplate({ vsfTuConfigFilePath, generatedTemplatePath });

    expect(log.error).toHaveBeenCalledWith(expect.any(String));
  });

  it('should log when removeFolder function fail', async () => {
    const removeFolderMock = removeFolder as vi.Mock;
    removeFolderMock.mockImplementation(() => {
      throw new Error();
    });
    const vsfTuConfigFilePath = '/home/root/test/nuxt.config.js';
    const generatedTemplatePath = '/home/root/test';

    await processTemplate({ vsfTuConfigFilePath, generatedTemplatePath });

    expect(log.error).toHaveBeenCalledWith(expect.any(String));
  });
});
