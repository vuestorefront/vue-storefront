import useCategory from '../../src/composables/useCategory';

jest.mock('@vue-storefront/about-you-api', () => ({
  getCategory: () =>
    Promise.resolve({})
}));

jest.mock('@vue-storefront/factories', () => ({
  useCategoryFactory: jest.fn(() => () => ({ foo: 'bar' }))
}));

describe('[about-you-composables] useCategory', () => {
  it('returns value of factory execution', () => {
    expect(useCategory('test')).toEqual({ foo: 'bar' });
  });
});
