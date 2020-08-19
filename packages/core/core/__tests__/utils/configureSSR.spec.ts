
import { ssrRef, onSSR, configureSSR } from '../../src/utils/ssr';
import { ref, onServerPrefetch } from '@vue/composition-api';

describe('[CORE - utils] configureSSR', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns default implementation', () => {
    expect(ssrRef).toEqual(ref);
    expect(onSSR).toEqual(onServerPrefetch);
  });

  it('returns configured implementation', () => {
    configureSSR({
      ssrRef: 'new-ref',
      onSSR: 'new-on-ssr'
    } as any);

    expect(ssrRef).toEqual('new-ref');
    expect(onSSR).toEqual('new-on-ssr');
  });

  it('returns configured implementation for onSSR', () => {
    configureSSR({
      onSSR: 'new-on-ssr-2'
    } as any);

    expect(ssrRef).toEqual('new-ref');
    expect(onSSR).toEqual('new-on-ssr-2');
  });

  it('returns configured implementation for ssrRef', () => {
    configureSSR({
      ssrRef: 'new-ref-2'
    } as any);

    expect(ssrRef).toEqual('new-ref-2');
    expect(onSSR).toEqual('new-on-ssr-2');
  });
});
