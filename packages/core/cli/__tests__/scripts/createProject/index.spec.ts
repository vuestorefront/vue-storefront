import { integrations } from '../../mock';
import createProject from '@vue-storefront/cli/src/scripts/createProject';

const targetPath = 'vsf-new-project';
const absoluteTargetPath = `/home/abc/${targetPath}`;

jest.mock('@vue-storefront/cli/src/utils/log', () => ({
  info: jest.fn()
}));

import path from 'path';
jest.mock('path', () => ({
  join: jest.fn(() => targetPath),
  isAbsolute: jest.fn(() => false)
}));

const copyIntegrationThemeMock = require('@vue-storefront/cli/src/scripts/createProject/copyIntegrationTheme');
jest.mock('@vue-storefront/cli/src/scripts/createProject/copyIntegrationTheme', () => jest.fn());

const copyAgnosticThemeMock = require('@vue-storefront/cli/src/scripts/createProject/copyAgnosticTheme');
jest.mock('@vue-storefront/cli/src/scripts/createProject/copyAgnosticTheme', () => jest.fn());

const processMagicCommentsMock = require('@vue-storefront/cli/src/scripts/createProject/processMagicComments');
jest.mock('@vue-storefront/cli/src/scripts/createProject/processMagicComments', () => jest.fn());

jest.mock('@vue-storefront/cli/src/utils/helpers', () => ({
  getProjectDirectoryName: (targetPath) => targetPath.split('/').pop()
}));

describe('[vsf-next-cli] createProject', () => {
  it('runs subprograms with proper arguments for relative path', async () => {

    integrations.map(async (integration) => {
      await createProject(integration, targetPath);

      expect(copyIntegrationThemeMock).toHaveBeenCalledWith(integration, targetPath, ['_theme', '.nuxt', 'node_modules']);
      expect(copyAgnosticThemeMock).toHaveBeenCalledWith(integration, targetPath);
      expect(processMagicCommentsMock).toHaveBeenCalledWith(targetPath);
    });
  });

  it('runs subprograms with proper arguments for absolute path', async () => {

    (path.join as jest.Mock).mockImplementation(() => absoluteTargetPath);
    (path.isAbsolute as jest.Mock).mockImplementation(() => true);

    integrations.map(async (integration) => {
      await createProject(integration, absoluteTargetPath);

      expect(copyIntegrationThemeMock).toHaveBeenCalledWith(integration, absoluteTargetPath, ['_theme', '.nuxt', 'node_modules']);
      expect(copyAgnosticThemeMock).toHaveBeenCalledWith(integration, absoluteTargetPath);
      expect(processMagicCommentsMock).toHaveBeenCalledWith(absoluteTargetPath);
    });
  });
});
