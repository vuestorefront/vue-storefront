import {mountMixin, mountMixinWithStore} from '@vue-storefront/unit-tests/utils';

import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { productThumbnailPath } from '@vue-storefront/core/helpers';

import { MicrocartProduct } from '../../../components/Product';
import Mock = jest.Mock;

jest.mock('@vue-storefront/core/helpers', () => ({
  productThumbnailPath: jest.fn()
}));
jest.mock('config', () => ({}))

describe('MicrocartProduct', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('thumbnail in online mode returns thumbnail in lower size', () => {
    (productThumbnailPath as Mock).mockReturnValueOnce('thumbnail-path');

    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });

    const product = {} as any as Product;
    const wrapper = mountMixin(MicrocartProduct, { propsData: { product } });
    const getThumbnail = jest.fn(() => 'resized-thumbnail-path');

    wrapper.setMethods({ getThumbnail });

    expect((wrapper.vm as any).thumbnail).toEqual('resized-thumbnail-path');
    expect(getThumbnail).toBeCalledWith('thumbnail-path', 150, 150);
  });

  it('thumbnail in offline mode returns thumbnail in greater size', () => {
    (productThumbnailPath as Mock).mockReturnValueOnce('thumbnail-path');

    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });

    const product = {} as any as Product;
    const wrapper = mountMixin(MicrocartProduct, { propsData: { product } });
    const getThumbnail = jest.fn(() => 'resized-thumbnail-path');

    wrapper.setMethods({ getThumbnail });

    expect((wrapper.vm as any).thumbnail).toEqual('resized-thumbnail-path');
    expect(getThumbnail).toBeCalledWith('thumbnail-path', 310, 300);
  });

  it('removeFromCart dispatches removeItem to remove product from cart', () => {
    const product = {} as any as Product;
    const storeMock = {
      modules: {
        cart: {
          actions: {
            removeItem: jest.fn()
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(MicrocartProduct, storeMock, { propsData: { product } });

    (wrapper.vm as any).removeFromCart();

    expect(storeMock.modules.cart.actions.removeItem).toBeCalledWith(expect.anything(), { product }, undefined);
  });

  it('updateQuantity dispatches updateQuantity update product quantity in cart', () => {
    const product = {} as any as Product;
    const qty = 123;
    const storeMock = {
      modules: {
        cart: {
          actions: {
            updateQuantity: jest.fn()
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(MicrocartProduct, storeMock, { propsData: { product } });

    (wrapper.vm as any).updateQuantity(qty);

    expect(storeMock.modules.cart.actions.updateQuantity).toBeCalledWith(
      expect.anything(),
      { product, qty },
      undefined
    );
  });
});
