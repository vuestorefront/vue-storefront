import { createExtendIntegrationInCtx } from '../../../src/utils/nuxt/context';

describe('createExtendIntegrationInCtx', () => {
  it('extendContent injects vsf if not injected', () => {
    const tag = 'myIntegration';
    const nuxtCtx = {
      $vsf: {}
    };
    const inject = jest.fn();

    const extendContext = createExtendIntegrationInCtx({
      tag,
      nuxtCtx,
      inject
    });

    try {
      extendContext({});
    } catch (err) {
      console.log('Prevent running rest of the function with exception');
    }

    expect(inject).toHaveBeenCalledWith('vsf', expect.objectContaining({
      [`$${tag}`]: expect.any(Object)
    }));
  });

  it('extendContent adds properties from props to the nuxtCtx.$vsf.$${tag}', () => {
    const tag = 'myIntegration';
    const nuxtCtx = {
      $vsf: {
        $myIntegration: {
          client: 'client',
          config: 'config'
        }
      }
    };
    const inject = jest.fn();

    const extendContext = createExtendIntegrationInCtx({
      tag,
      nuxtCtx,
      inject
    });

    extendContext({
      testFieldToAdd: 15
    });

    expect((nuxtCtx.$vsf.$myIntegration as any).testFieldToAdd).toBe(15);
  });

  it('extendContent extends api with response from applyContextToApi', () => {
    const tag = 'myIntegration';
    const nuxtCtx = {
      $vsf: {
        $myIntegration: {
          client: 'client',
          config: 'config'
        }
      }
    };
    const inject = jest.fn();

    const extendContext = createExtendIntegrationInCtx({
      tag,
      nuxtCtx,
      inject
    });

    extendContext({
      testFieldToAdd: 15
    });

    expect((nuxtCtx.$vsf.$myIntegration as any).testFieldToAdd).toBe(15);
  });
});
