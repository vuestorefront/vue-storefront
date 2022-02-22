import { useFacetFactory } from '../../src/factories';

const factoryParams = {
  search: jest.fn()
};

const useFacetMock = useFacetFactory(factoryParams);

describe('[CORE - factories] useFacetFactory', () => {
  it('creates properties', () => {
    const factorySearch = () => jest.fn();

    const useFacet = useFacetFactory({ search: factorySearch } as any);
    const { result, loading } = useFacet();

    expect(result.value).toEqual({ data: null, input: null });
    expect(loading.value).toEqual(false);
  });

  it('triggers search', () => {
    const factorySearch = () => jest.fn();

    const useFacet = useFacetFactory({ search: factorySearch } as any);
    const { result, loading, search } = useFacet();

    search({ param: 'test' });
    expect(result.value).toEqual({ data: null, input: { param: 'test' } });
    expect(loading.value).toEqual(true);
  });

  it('should set error if factory method throwed', async () => {
    const err = new Error('zxczxcx');
    factoryParams.search.mockImplementationOnce(() => {
      throw err;
    });
    const { search, error } = useFacetMock('a');

    await search({ someparam: 'qwerty' });

    expect(error.value.search).toBe(err);
  });
});
