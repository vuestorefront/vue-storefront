import { getCurrentInstance, onServerPrefetch } from '@vue/composition-api';
import { usePersistedState } from '../src';

jest.mock('@vue/composition-api');

describe('[CORE - utils] usePersistedState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('set vsfState state on SSR', () => {
    const vm = {
      $isServer: true,
      $ssrContext: {
        nuxt: {
          vsfState: null
        }
      }
    };

    (getCurrentInstance as any).mockImplementation(() => vm);

    const { state } = usePersistedState('some-id');

    expect(vm.$ssrContext.nuxt.vsfState).toEqual({});
    expect(state).toEqual(undefined);
  });

  it('returns ssrState', () => {
    const vm = {
      $isServer: true,
      $ssrContext: {
        nuxt: {
          vsfState: { 'some-id': 5 }
        }
      }
    };

    (getCurrentInstance as any).mockImplementation(() => vm);
    const s1 = usePersistedState('some-id');
    expect(s1.state).toEqual(5);

    const s2 = usePersistedState('some-id-2');
    expect(s2.state).toEqual(undefined);
  });

  it('returns window state', () => {
    const vm = { $isServer: false };
    // @ts-ignore
    window.__VSF_STATE__ = { 'some-id': 5 };

    (getCurrentInstance as any).mockImplementation(() => vm);
    const s1 = usePersistedState('some-id');
    expect(s1.state).toEqual(5);

    const s2 = usePersistedState('some-id-2');
    expect(s2.state).toEqual(undefined);
  });

  it('returns window state if window is not set', () => {
    const vm = { $isServer: false };
    // @ts-ignore
    window.__VSF_STATE__ = null;

    (getCurrentInstance as any).mockImplementation(() => vm);
    const s1 = usePersistedState('some-id');
    expect(s1.state).toEqual(undefined);
  });

  it('fetches data using persisted state on SSR', async () => {
    const vm = {
      $isServer: true,
      $ssrContext: {
        nuxt: {
          vsfState: {}
        }
      }
    };
    (getCurrentInstance as any).mockImplementation(() => vm);

    (onServerPrefetch as any).mockImplementation((fn: any) => fn());
    const { persistedResource } = usePersistedState('some-id');

    const result = await persistedResource(
      () => Promise.resolve('some-response'),
      1
    );

    expect(result).toEqual('some-response');
    expect(vm.$ssrContext.nuxt.vsfState).toEqual({
      'some-id': 'some-response'
    });
  });

  it('fetches data using persisted state on CSR', async () => {
    const vm = {
      $isServer: false,
      $ssrContext: {
        nuxt: {
          vsfState: {}
        }
      }
    };
    (getCurrentInstance as any).mockImplementation(() => vm);

    (onServerPrefetch as any).mockImplementation(() => null);
    const { persistedResource } = usePersistedState('some-id');

    const result = await persistedResource(
      () => Promise.resolve('some-response'),
      1
    );

    expect(result).toEqual('some-response');
    expect(vm.$ssrContext.nuxt.vsfState).toEqual({});
  });
});
