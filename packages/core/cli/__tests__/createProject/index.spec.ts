import createProject from '../../src/scripts/createProject';

const path = require('path');

jest.mock('@vue-storefront/cli/src/utils/log', () => ({
  info: jest.fn()
}));

const copyIntegrationThemeMock = require('@vue-storefront/cli/src/scripts/createProject/copyIntegrationTheme');
jest.mock('@vue-storefront/cli/src/scripts/createProject/copyIntegrationTheme', () => jest.fn());

const copyAgnosticThemeMock = require('@vue-storefront/cli/src/scripts/createProject/copyAgnosticTheme');
jest.mock('@vue-storefront/cli/src/scripts/createProject/copyAgnosticTheme', () => jest.fn());

const removeMagicCommentsFromFileMock = require('@vue-storefront/cli/src/scripts/createProject/removeMagicCommentsFromFile');
jest.mock('@vue-storefront/cli/src/scripts/createProject/removeMagicCommentsFromFile', () => jest.fn());

describe('[vsf-next-cli] createProject', () => {
  it('runs subprograms with proper arguments', async () => {

    jest.clearAllMocks();

    const integration = 'commercetools';
    const targetPath = 'vsf-new-project';

    await createProject(integration, targetPath);

    expect(copyIntegrationThemeMock).toHaveBeenCalledWith(integration, targetPath, ['.theme', '.nuxt', 'node_modules']);
    expect(copyAgnosticThemeMock).toHaveBeenCalledWith(integration, targetPath);
    expect(removeMagicCommentsFromFileMock).toHaveBeenCalledWith(
      path.join(path.resolve('./src/scripts/createProject'), targetPath, 'nuxt.config.js')
    );

  });
});
