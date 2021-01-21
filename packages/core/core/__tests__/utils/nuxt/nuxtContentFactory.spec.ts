import { nuxtContextFactory } from '../../../src/utils/nuxt/nuxtContextFactory';
import { applyContextToApi } from '../../../src/utils/context';
jest.mock('../../../src/utils/context', () => ({
  applyContextToApi: jest.fn()
}));

describe('nuxtContextFactory', () => {
  it('injectInContext uses inject if nuxtCtx.$vsf does not exist', () => {
    const tag = 'myIntegration';
    const nuxtCtx = {};
    const inject = jest.fn();

    const {
      injectInContext
    } = nuxtContextFactory({
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
    const inject = jest.fn();

    const {
      injectInContext
    } = nuxtContextFactory({
      tag,
      nuxtCtx,
      inject
    });

    injectInContext('props');

    expect(nuxtCtx.$vsf[`$${tag}`]).toBe('props');
  });

  it('extendContent injects vsf if not injected', () => {
    const tag = 'myIntegration';
    const nuxtCtx = {
      $vsf: {}
    };
    const inject = jest.fn();

    const {
      extendContext
    } = nuxtContextFactory({
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

    const {
      extendContext
    } = nuxtContextFactory({
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

    const {
      extendContext
    } = nuxtContextFactory({
      tag,
      nuxtCtx,
      inject
    });

    extendContext({
      testFieldToAdd: 15
    });

    expect((nuxtCtx.$vsf.$myIntegration as any).testFieldToAdd).toBe(15);
  });

  it('extendContext extends api if available', () => {
    (applyContextToApi as jest.Mock).mockImplementation((api, { client, config }) => ({
      ...api,
      ...client,
      ...config
    }));
    const tag = 'myIntegration';
    const nuxtCtx = {
      $vsf: {
        $myIntegration: {
          client: 'client',
          config: {
            a: 1
          },
          api: {
            b: 2
          }
        }
      }
    };
    const inject = jest.fn();

    const {
      extendContext
    } = nuxtContextFactory({
      tag,
      nuxtCtx,
      inject
    });

    extendContext({
      api: {
        c: 3
      },
      config: {
        d: 4
      }
    });

    expect((nuxtCtx.$vsf.$myIntegration as any).api).toMatchObject({
      a: 1,
      b: 2,
      c: 3,
      d: 4
    });
  });

  it('extendContext extends api if available with props.api not provided', () => {
    (applyContextToApi as jest.Mock).mockImplementation((api, { client, config }) => ({
      ...api,
      ...client,
      ...config
    }));
    const tag = 'myIntegration';
    const nuxtCtx = {
      $vsf: {
        $myIntegration: {
          client: 'client',
          config: {
            a: 1
          },
          api: {
            b: 2
          }
        }
      }
    };
    const inject = jest.fn();

    const {
      extendContext
    } = nuxtContextFactory({
      tag,
      nuxtCtx,
      inject
    });

    extendContext({});

    expect((nuxtCtx.$vsf.$myIntegration as any).api).toMatchObject({
      a: 1,
      b: 2
    });
  });
});
