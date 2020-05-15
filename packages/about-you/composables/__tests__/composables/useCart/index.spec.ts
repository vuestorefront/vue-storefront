import { useCart } from '../../../src/composables/useCart';
import { useCartFactory } from '@vue-storefront/core';
import { params } from '../../../src/composables/useCart/factoryParams';

jest.mock('@vue-storefront/core', () => ({
  useCartFactory: jest.fn(() => ({useCart: () => ({ id: 'cart-id' }), setCart: jest.fn()}))
}));

jest.mock('../../../src/composables/useCart/factoryParams', () => ({
  params: {}
}));

describe('[about-you-composables] useCart', () => {
  it('returns useUserFactory functions', () => {
    expect(useCartFactory).toHaveBeenCalledWith(params);
    expect(useCart()).toEqual({id: 'cart-id'});
  });
});
