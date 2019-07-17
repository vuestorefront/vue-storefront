import { CartModule } from '../../index'

jest.mock('../../store', () => ({}));
jest.mock('@vue-storefront/module', () => ({ createModule: jest.fn(() => ({ module: 'cart' })) }));
jest.mock('../../helpers/cartCacheHandler', () => ({ cartCacheHandlerFactory: jest.fn() }))
jest.mock('@vue-storefront/core/helpers', () => ({ isServer: false }))
jest.mock('@vue-storefront/core/helpers/cache', () => ({ initCacheStorage: jest.fn() }));

describe('Cart Module', () => {
  it('can be initialized', () => {
    expect(CartModule).toBeTruthy()
  })
});
