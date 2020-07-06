const getThemePath = require('../../src/scripts/createProject/getThemePath');

describe('[vsf-next-cli] getThemePath', () => {
  it('creates a proper path', () => {
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
});
