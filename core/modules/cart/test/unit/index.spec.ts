import { Cart } from '../../index'

jest.mock('../../store', () => ({}));
jest.mock('@vue-storefront/core/lib/module', () => ({ createModule: jest.fn(() => ({ module: 'cart' })) }));
jest.mock('../../hooks/beforeRegistration', () => jest.fn());
jest.mock('../../hooks/afterRegistration', () => jest.fn());

describe('Cart Module', () => {
  it('can be initialized', () => {
    expect(Cart).toBeTruthy()
  })
});
