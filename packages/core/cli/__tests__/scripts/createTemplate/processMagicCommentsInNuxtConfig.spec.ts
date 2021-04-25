import processMagicComments from '../../../src/scripts/createProject/processMagicComments';
import { processMagicCommentsInNuxtConfig } from '../../../src/scripts/createTemplate/processMagicCommentsInNuxtConfig';
import path from 'path';
jest.mock('path', () => ({
  join: jest.fn((path, fileName) => `${path}/${fileName}`)
}));
jest.mock(
  '@vue-storefront/cli/src/scripts/createProject/processMagicComments',
  () => ({
    __esModule: true,
    default: jest.fn(async (nuxtConfigPath) => nuxtConfigPath)
  })
);

describe('[@core/cli/scripts] process magic comments in nuxt config', () => {
  it('should create absolute path to nuxt.config.js file', async () => {
    const generatedTemplatePath = '/home/root/test';
    const nuxtConfigFile = path.join(generatedTemplatePath, 'nuxt.config.js');
    await processMagicCommentsInNuxtConfig(generatedTemplatePath);
    expect(path.join).toHaveBeenCalledWith(
      generatedTemplatePath,
      'nuxt.config.js'
    );
    expect(processMagicComments).toHaveBeenCalledWith(nuxtConfigFile);
  });
});
