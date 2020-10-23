import copyProject from '../../../src/scripts/copyProject';
import { copyThemeFiles } from '@vue-storefront/cli/src/utils/helpers';
import updatePackageJson from '@vue-storefront/cli/src/scripts/createProject/updatePackageJson';
import { integrations } from '../../mock';

const targetPath = 'vsf-new-project';
const absoluteTargetPath = `/home/abc/${targetPath}`;

import path from 'path';

const resolvedTargetPath = 'a';
const projectName = 'coolProject';

jest.mock('path', () => ({
  join: jest.fn(() => targetPath),
  isAbsolute: jest.fn(() => false),
  resolve: jest.fn(() => resolvedTargetPath)
}));

jest.mock('@vue-storefront/cli/src/scripts/createProject/updatePackageJson', () => jest.fn());

jest.mock('@vue-storefront/cli/src/utils/helpers', () => ({
  copyThemeFiles: jest.fn()
}));

describe('[vsf-next-cli] copyProject', () => {
  it('runs with proper arguments for relative path', () => {

    integrations.map(async (integration) => {
      await copyProject(integration, targetPath, projectName);

      expect(copyThemeFiles).toHaveBeenCalledWith(resolvedTargetPath, targetPath, resolvedTargetPath);
      expect(updatePackageJson).toHaveBeenCalledWith(targetPath, projectName);
    });
  });

  it('runs with proper arguments for absolute path', async () => {

    (path.join as jest.Mock).mockImplementation(() => absoluteTargetPath);
    (path.isAbsolute as jest.Mock).mockImplementation(() => true);

    integrations.map(async (integration) => {
      await copyProject(integration, absoluteTargetPath, projectName);

      expect(copyThemeFiles).toHaveBeenCalledWith(resolvedTargetPath, targetPath, resolvedTargetPath);
      expect(updatePackageJson).toHaveBeenCalledWith(targetPath, projectName);
    });
  });
});
