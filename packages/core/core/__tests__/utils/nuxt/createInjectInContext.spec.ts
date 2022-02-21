import { createAddIntegrationToCtx } from '../../../src/utils/nuxt/context';
vi.mock('../../../src/utils/context', () => ({
  applyContextToApi: vi.fn()
}));

describe('createAddIntegrationToCtx', () => {
  it('injectInContext uses inject if nuxtCtx.$vsf does not exist', () => {
    const tag = 'myIntegration';
    const nuxtCtx = {};
    const inject = vi.fn();

    const injectInContext = createAddIntegrationToCtx({
      tag,
      nuxtCtx,
      inject
    });

    injectInContext('props');

    expect(inject).toHaveBeenCalledWith('vsf', expect.objectContaining({
      [`$${tag}`]: 'props'
    }));
  });

  it('injectInContext adds property if property does not exist in nuxtCtx.$vsf', () => {
    const tag = 'myIntegration';
    const nuxtCtx = {
      $vsf: {}
    };
    const inject = vi.fn();

    const injectInContext = createAddIntegrationToCtx({
      tag,
      nuxtCtx,
      inject
    });

    injectInContext('props');

    expect(nuxtCtx.$vsf[`$${tag}`]).toBe('props');
  });
});
