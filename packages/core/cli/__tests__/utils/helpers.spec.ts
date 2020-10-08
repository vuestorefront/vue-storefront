import { getDependencyPath, buildFileTargetPath, copyThemeFiles } from '@vue-storefront/cli/src/utils/helpers';
import path from 'path';
import { copyFile } from '@vue-storefront/nuxt-theme/scripts/copyThemeFiles';

import { statSync } from 'fs';
jest.mock('fs', () => ({
  statSync: jest.fn(() => ({
    isDirectory: () => true
  }))
}));

const filesInDir = [
  '/dir/abc.jpg',
  '/dir/yht.html'
];

jest.mock('@vue-storefront/nuxt-theme/scripts/getAllFilesFromDir.js', () => () => filesInDir);
jest.mock('@vue-storefront/nuxt-theme/scripts/copyThemeFiles', () => ({
  copyFile: jest.fn()
}));

jest.mock('../../src/utils/helpers', () => ({
  ...jest.requireActual('../../src/utils/helpers'),
  buildFileTargetPath: jest.fn(jest.requireActual('../../src/utils/helpers').buildFileTargetPath)
}));

describe('[vsf-next-cli] getDependencyPath', () => {
  it('getDependencyPath - creates a proper path', () => {
    const tests = [
      {
        input: 'commercetools',
        output: path.resolve(__dirname, '../../../../../packages/commercetools/composables')
      },
      {
        input: 'nuxt-theme',
        output: path.resolve(__dirname, '../../../../../packages/core/nuxt-theme-module')
      }
    ];

    for (const test of tests) {
      const testOutput = getDependencyPath(test.input);
      expect(testOutput).toBe(test.output);
    }

  });

  it('buildFileTargetPath - ', () => {
    const tests = [
      {
        input: [
          '../../../../../../node_modules/@vue-storefront/commercetools-theme/.editorconfig',
          '/home/someone/Projects/Next/packages/core/cli/src/scripts/createProject/testbuild4',
          '../../../../../../node_modules/@vue-storefront/commercetools-theme'
        ],
        output: '/home/someone/Projects/Next/packages/core/cli/src/scripts/createProject/testbuild4/.editorconfig'
      },
      {
        input: [
          '../../../../../../node_modules/@vue-storefront/commercetools-theme/middleware',
          '/home/someone/Projects/Next/packages/core/cli/src/scripts/createProject/testbuild4',
          '../../../../../../node_modules/@vue-storefront/commercetools-theme'
        ],
        output: '/home/someone/Projects/Next/packages/core/cli/src/scripts/createProject/testbuild4/middleware'
      }
    ];
    for (const test of tests) {
      const testOutput = buildFileTargetPath(test.input[0], test.input[1], test.input[2]);
      expect(testOutput).toBe(test.output);
    }

  });

  it('copyThemeFiles for directory', async () => {
    const filesDir = 'some-dir';
    const targetPath = 'some-target-path';
    await copyThemeFiles(filesDir, targetPath, '');

    for (const fileInDir of filesInDir) {
      expect(copyFile).toHaveBeenCalledWith(fileInDir, `${targetPath}${fileInDir}`);
    }
  });

  it('copyThemeFiles for a file', async () => {
    jest.clearAllMocks();
    (statSync as jest.Mock).mockImplementation(() => ({
      isDirectory: () => false
    }));

    const fileDir = 'some-dir';
    const targetPath = 'some-target-path/';
    await copyThemeFiles(fileDir, targetPath, '');

    expect(copyFile).toHaveBeenCalledWith(fileDir, `${targetPath}${fileDir}`);

  });
});
