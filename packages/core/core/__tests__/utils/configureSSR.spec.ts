
import { vsfRef, onSSR, configureSSR } from '../../src/utils/ssr';
import { ref, onServerPrefetch } from '@vue/composition-api';

describe('[CORE - utils] configureSSR', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns default implementation', () => {
    expect(vsfRef).toEqual(ref);
    expect(onSSR).toEqual(onServerPrefetch);
  });

  it('returns configured implementation', () => {
    configureSSR({
      vsfRef: 'new-ref',
      onSSR: 'new-on-ssr'
    } as any);

    expect(vsfRef).toEqual('new-ref');
    expect(onSSR).toEqual('new-on-ssr');
  });

  it('returns configured implementation for onSSR', () => {
    configureSSR({
      onSSR: 'new-on-ssr-2'
    } as any);

    expect(vsfRef).toEqual('new-ref');
    expect(onSSR).toEqual('new-on-ssr-2');
  });

  it('returns configured implementation for vsfRef', () => {
    configureSSR({
      vsfRef: 'new-ref-2'
    } as any);

    expect(vsfRef).toEqual('new-ref-2');
    expect(onSSR).toEqual('new-on-ssr-2');
  });
});
