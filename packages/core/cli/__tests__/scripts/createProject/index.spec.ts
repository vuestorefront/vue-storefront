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

jest.mock('shelljs', () => ({
  rm: jest.fn(),
  mkdir: jest.fn(),
  cd: jest.fn(),
  exec: jest.fn()
}));

const processMagicCommentsMock = require('@vue-storefront/cli/src/scripts/createProject/processMagicComments');
jest.mock(
  '@vue-storefront/cli/src/scripts/createProject/processMagicComments',
  () => jest.fn()
);

jest.mock('@vue-storefront/cli/src/utils/helpers', () => ({
  getProjectDirectoryName: (targetPath) => targetPath.split('/').pop()
}));

describe('[vsf-next-cli] createProject', () => {
  it('runs subprograms with proper arguments for relative path', async () => {
    for (const [integration, repositoryLink] of Object.entries(integrations)) {
      await createProject({
        projectName: integration,
        targetPath,
        repositoryLink
      });
      expect(processMagicCommentsMock).toHaveBeenCalledWith(targetPath);
    }
  });

  it('runs subprograms with proper arguments for absolute path', async () => {
    (path.join as jest.Mock).mockImplementation(() => absoluteTargetPath);
    (path.isAbsolute as jest.Mock).mockImplementation(() => true);

    for (const [integration, repositoryLink] of Object.entries(integrations)) {
      await createProject({
        projectName: integration,
        targetPath: absoluteTargetPath,
        repositoryLink
      });
      expect(processMagicCommentsMock).toHaveBeenCalledWith(absoluteTargetPath);
    }
  });
});
