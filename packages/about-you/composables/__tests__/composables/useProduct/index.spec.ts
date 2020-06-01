import useProduct from '../../../src/composables/useProduct';
import { useProductFactory } from '@vue-storefront/core';
import { params } from '../../../src/composables/useProduct/factoryParams';

jest.mock('@vue-storefront/core', () => ({
  useProductFactory: jest.fn(() => () => ({ products: [] }))
}));

jest.mock('../../../src/composables/useProduct/factoryParams', () => ({
  params: {}
}));

describe('[about-you-composables] useProduct', () => {
  it('returns useUserFactory functions', () => {
    expect(useProductFactory).toHaveBeenCalledWith(params);
    expect(useProduct('products')).toEqual({ products: []});
  });
});
