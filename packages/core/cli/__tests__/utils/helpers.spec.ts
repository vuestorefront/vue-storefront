import { getThemePath, buildFileTargetPath } from '../../src/utils/helpers';

describe('[vsf-next-cli] getThemePath', () => {
  it('getThemePath - creates a proper path', () => {
    const tests = [
      {
        input: 'commercetools',
        output: '../../../node_modules/@vue-storefront/commercetools'
      },
      {
        input: 'nuxt-theme/theme',
        output: '../../../node_modules/@vue-storefront/nuxt-theme/theme'
      }
    ];

    for (const test of tests) {
      const testOutput = getThemePath(test.input);
      expect(testOutput).toBe(test.output);
    }

  });

  it('buildFileTargetPath - ', () => {
    const tests = [
      {
        input: [
          '../../../node_modules/@vue-storefront/commercetools-theme/.editorconfig',
          '/home/someone/Projects/Next/packages/core/cli/src/scripts/createProject/testbuild4',
          '../../../node_modules/@vue-storefront/commercetools-theme'
        ],
        output: '/home/someone/Projects/Next/packages/core/cli/src/scripts/createProject/testbuild4/.editorconfig'
      },
      {
        input: [
          '../../../node_modules/@vue-storefront/commercetools-theme/middleware',
          '/home/someone/Projects/Next/packages/core/cli/src/scripts/createProject/testbuild4',
          '../../../node_modules/@vue-storefront/commercetools-theme'
        ],
        output: '/home/someone/Projects/Next/packages/core/cli/src/scripts/createProject/testbuild4/middleware'
      }
    ];
    for (const test of tests) {
      const testOutput = buildFileTargetPath(test.input[0], test.input[1], test.input[2]);
      expect(testOutput).toBe(test.output);
    }

  });
});
