import { CartModule } from '../../index'

jest.mock('../../store', () => ({}));
jest.mock('@vue-storefront/module', () => ({ createModule: jest.fn(() => ({ module: 'cart' })) }));

describe('Cart Module', () => {
  it('can be initialized', () => {
    expect(CartModule).toBeTruthy()
  })
});
