import processMagicComments from '../../../src/scripts/createProject/processMagicComments';
import { processMagicCommentsInNuxtConfig } from '../../../src/scripts/createTemplate/processMagicCommentsInNuxtConfig';
import path from 'path';
import log from '../../../src/utils/log';
jest.mock('path', () => ({
  join: jest.fn((path, fileName) => `${path}/${fileName}`)
}));
jest.mock(
  '@vue-storefront/cli/src/scripts/createProject/processMagicComments',
  () => jest.fn()
);
jest.mock('@vue-storefront/cli/src/utils/log', () => ({
  __esModule: true,
  default: {
    error: jest.fn((text: string) => text)
  }
}));

describe('[@core/cli/scripts] process magic comments in nuxt config', () => {
  it('should create absolute path to nuxt.config.js file', async () => {
    const processMagicCommentsMock = processMagicComments as jest.Mock;
    processMagicCommentsMock.mockImplementation(() => ({
      __esModule: true,
      default: jest.fn(async (nuxtConfigPath) => nuxtConfigPath)
    }));
    const generatedTemplatePath = '/home/root/test';
    const nuxtConfigFile = path.join(generatedTemplatePath, 'nuxt.config.js');

    await processMagicCommentsInNuxtConfig(generatedTemplatePath);

    expect(path.join).toHaveBeenCalledWith(
      generatedTemplatePath,
      'nuxt.config.js'
    );
    expect(processMagicComments).toHaveBeenCalledWith(nuxtConfigFile);
  });

  it('should log error when processMagicComments fail', async () => {
    const processMagicCommentsMock = processMagicComments as jest.Mock;
    processMagicCommentsMock.mockImplementation(() => {
      throw new Error();
    });
    const generatedTemplatePath = '/home/root/test';

    await processMagicCommentsInNuxtConfig(generatedTemplatePath);

    expect(log.error).toHaveBeenCalledWith(expect.any(String));
  });
});
