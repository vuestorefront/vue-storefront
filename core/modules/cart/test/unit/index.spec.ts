jest.mock('../../store', () => ({}));
jest.mock('@vue-storefront/core/lib/module', () => ({VueStorefrontModule: jest.fn()}));
jest.mock('../../hooks/beforeRegistration', () => jest.fn());
jest.mock('../../hooks/afterRegistration', () => jest.fn());

import { Cart } from '../../index'

describe('Cart Module', () => {
  it('can be initialized', () => {
    expect(Cart).toBeTruthy()
  })
});
