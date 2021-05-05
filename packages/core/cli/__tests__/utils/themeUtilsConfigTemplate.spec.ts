import { vsfTuConfig } from '../../src/utils/themeUtilsConfigTemplate';

describe('[@core/cli/src/utils] VSF theme utils config', () => {
  it('should generate string for config file', () => {
    const outputPathName = 'home/test';
    const themePath = 'home/theme';
    const _themePath = 'home/theme/_theme';
    const result = vsfTuConfig({ outputPathName, themePath, _themePath });

    expect(result).toMatch(
      /('home\/test'|'home\/theme'|'home\/theme\/_theme')/i
    );
  });
});
