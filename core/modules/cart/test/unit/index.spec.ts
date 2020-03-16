import { CartModule } from '../../index'

jest.mock('../../store', () => ({}));
jest.mock('@vue-storefront/core/lib/modules', () => ({ createModule: jest.fn(() => ({ module: 'cart' })) }));
jest.mock('../../helpers/cartCacheHandler', () => ({ cartCacheHandlerFactory: jest.fn() }))
jest.mock('@vue-storefront/core/helpers', () => ({ isServer: false }))
jest.mock('@vue-storefront/core/lib/storage-manager', () => ({ initCacheStorage: jest.fn() }));
jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('@vue-storefront/core/app', () => jest.fn())
jest.mock('@vue-storefront/core/store', () => ({}))
jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: jest.fn(),
  localizedRoute: jest.fn()
}));

describe('Cart Module', () => {
  it('can be initialized', () => {
    expect(CartModule).toBeTruthy()
  })
});
