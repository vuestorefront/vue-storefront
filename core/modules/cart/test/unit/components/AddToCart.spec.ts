import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils';
import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { AddToCart } from '../../../components/AddToCart'
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    log: jest.fn(() => () => {}),
    debug: jest.fn(() => () => {}),
    warn: jest.fn(() => () => {}),
    error: jest.fn(() => () => {})
  }
}));
jest.mock('@vue-storefront/core/app', () => ({ createApp: jest.fn() }))
jest.mock('@vue-storefront/i18n', () => ({ loadLanguageAsync: jest.fn() }))
jest.mock('@vue-storefront/core/helpers', () => ({
  once: jest.fn()
}));

describe('AddToCart', () => {
  it('addToCart dispatches addItem action', () => {
    const product = {} as any as Product;

    const storeMock = {
      modules: {
        cart: {
          actions: {
            addItem: jest.fn(() => [])
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(AddToCart, storeMock, { propsData: { product } });

    (wrapper.vm as any).addToCart(product);

    expect(storeMock.modules.cart.actions.addItem).toBeCalledWith(expect.anything(), { productToAdd: product });
  })
});
