import createProject from '../../src/scripts/createProject';

const integration = 'commercetools';
const targetPath = 'vsf-new-project';

jest.mock('@vue-storefront/cli/src/utils/log', () => ({
  info: jest.fn()
}));

jest.mock('path', () => ({
  join: () => targetPath
}));

const copyIntegrationThemeMock = require('@vue-storefront/cli/src/scripts/createProject/copyIntegrationTheme');
jest.mock('@vue-storefront/cli/src/scripts/createProject/copyIntegrationTheme', () => jest.fn());

const copyAgnosticThemeMock = require('@vue-storefront/cli/src/scripts/createProject/copyAgnosticTheme');
jest.mock('@vue-storefront/cli/src/scripts/createProject/copyAgnosticTheme', () => jest.fn());

const processMagicCommentsMock = require('@vue-storefront/cli/src/scripts/createProject/processMagicComments');
jest.mock('@vue-storefront/cli/src/scripts/createProject/processMagicComments', () => jest.fn());

describe('[vsf-next-cli] createProject', () => {
  it('runs subprograms with proper arguments', async () => {

    await createProject(integration, targetPath);

    expect(copyIntegrationThemeMock).toHaveBeenCalledWith(integration, targetPath, ['.theme', '.nuxt', 'node_modules']);
    expect(copyAgnosticThemeMock).toHaveBeenCalledWith(integration, targetPath);
    expect(processMagicCommentsMock).toHaveBeenCalledWith(targetPath);
  });
});
