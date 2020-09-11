import { useFacetFactory } from '../../src/factories';

describe('[CORE - factories] useFacetFactory', () => {
  it('creates properties', () => {
    const factorySearch = () => jest.fn();

    const useFacet = useFacetFactory({ search: factorySearch } as any);
    const { searchData, loading } = useFacet();

    expect(searchData.value).toEqual({ data: null, input: null });
    expect(loading.value).toEqual(false);
  });

  it('triggers search', () => {
    const factorySearch = () => jest.fn();

    const useFacet = useFacetFactory({ search: factorySearch } as any);
    const { searchData, loading, search } = useFacet();

    search({ param: 'test' });
    expect(searchData.value).toEqual({ data: null, input: { param: 'test' } });
    expect(loading.value).toEqual(true);
  });
});
