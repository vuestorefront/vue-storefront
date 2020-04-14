import { getCurrentInstance, onServerPrefetch } from '@vue/composition-api';
import { emit, on } from '../../src/utils/ssr/default/eventBus';
import { useSSR, onSSR } from '../../src/utils/ssr';

jest.mock('@vue/composition-api');
jest.mock('../../src/utils/ssr/default/eventBus', () => ({
  on: jest.fn(),
  emit: jest.fn()
}));

describe('[CORE - utils] ssr', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('set epmty SSR state', () => {
    const vm = {
      $isServer: true,
      $ssrContext: {
        nuxt: {
          vsfState: null
        }
      }
    };

    (getCurrentInstance as any).mockImplementation(() => vm);

    useSSR('some-cache-id');

    expect(vm.$ssrContext.nuxt.vsfState).toEqual({});
  });

  it('reads SSR state', () => {
    const vm = {
      $isServer: true,
      $ssrContext: {
        nuxt: {
          vsfState: {
            'some-cache-id': 'test'
          }
        }
      }
    };

    (getCurrentInstance as any).mockImplementation(() => vm);

    const { initialState } = useSSR('some-cache-id');

    expect(initialState).toEqual('test');
  });

  it('reads CSR state', () => {
    const vm = {
      $isServer: false,
      $ssrContext: {
        nuxt: {
          vsfState: null
        }
      }
    };

    // @ts-ignore
    window.__VSF_STATE__ = { 'some-cache-id': 5 };
    (getCurrentInstance as any).mockImplementation(() => vm);

    const { initialState } = useSSR('some-cache-id');

    expect(initialState).toEqual(5);
  });

  it('reads CSR state', () => {
    (emit as any).mockImplementation(() => {});
    const { saveToInitialState} = useSSR('some-cache-id');
    saveToInitialState('test-value');

    expect(emit).toBeCalled();
  });

  it('set SSR state', () => {
    const vm = {
      $isServer: true,
      $ssrContext: {
        nuxt: {
          vsfState: null
        }
      }
    };
    (on as any).mockImplementation((_, fn) =>
      fn({ key: 'cache-id', value: 'test-value' })
    );
    (getCurrentInstance as any).mockImplementation(() => vm);
    (onServerPrefetch as any).mockImplementation(async (fn: any) => {
      await fn();
      expect(on).toBeCalled();
      expect(vm.$ssrContext.nuxt.vsfState).toEqual({ 'cache-id': 'test-value' });
    });
    const mockedFunc = jest.fn();

    onSSR(mockedFunc);
    expect(mockedFunc).toBeCalledTimes(1);
  });

  it('call func on CSR', () => {
    const vm = {
      $isServer: false,
      $ssrContext: {
        nuxt: {
          vsfState: null
        }
      }
    };

    const jsonSpy = jest.spyOn(JSON, 'stringify').mockImplementation(() => ({ length: 0 } as any));

    (getCurrentInstance as any).mockImplementation(() => vm);
    (onServerPrefetch as any).mockImplementation(() => {});
    const mockedFunc = jest.fn();

    onSSR(mockedFunc);
    expect(mockedFunc).toBeCalledTimes(1);

    jsonSpy.mockRestore();
  });

  it('should not call func on CSR', () => {
    const vm = {
      $isServer: false,
      $ssrContext: {
        nuxt: {
          vsfState: null
        }
      }
    };

    // @ts-ignore
    const windowSpy = jest.spyOn(global, 'window', 'get').mockImplementation(() => ({ __VSF_STATE__: { test: 1 } }));

    (getCurrentInstance as any).mockImplementation(() => vm);
    (onServerPrefetch as any).mockImplementation(() => {});
    const mockedFunc = jest.fn();

    onSSR(mockedFunc);
    expect(mockedFunc).not.toBeCalled();

    windowSpy.mockRestore();
  });
});
