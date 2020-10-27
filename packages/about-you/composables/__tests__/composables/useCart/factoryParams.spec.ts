import {
  getCart,
  addItemToCart,
  deleteItemFromCart,
  updateItemInCart
} from '@vue-storefront/about-you-api';
import { params } from '../../../src/composables/useCart/factoryParams';
import { BasketItem } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { BapiProduct, BasketResponseData } from '@aboutyou/backbone';

jest.mock('@vue-storefront/about-you-api', () => ({
  getCart: jest.fn(async () => {}),
  addItemToCart: jest.fn(async () => {}),
  deleteItemFromCart: jest.fn(async () => {}),
  updateItemInCart: jest.fn(async () => {})
}));

describe('[about-you-composables] useCart factoryParams', () => {
  it('loadCart returns cart with items', async () => {
    const expectedCart = {
      basket: {
        items: [
          {id: 123}
        ]
      }
    };

    (getCart as jest.Mock).mockReturnValueOnce(expectedCart);

    expect(await params.loadCart()).toEqual(expectedCart.basket);
  });

  describe('addToCart', () => {
    it('calls addItemToCart endpoint and returns updated cart when product doesn\'t exists in cart', async () => {
      const initialCart: BasketResponseData = {
        cost: null,
        currencyCode: 'EUR',
        items: [],
        key: null,
        packages: []
      };
      const expectedCart = {
        cost: null,
        currencyCode: 'EUR',
        items: [{
          customData: null,
          displayData: null,
          key: '',
          packageId: 0,
          price: {total: null, unit: null},
          product: {
            id: 123
          } as any,
          quantity: 1,
          status: null,
          variant: null
        }],
        key: null,
        packages: []
      };

      const product: BapiProduct = {
        createdAt: '',
        id: 123,
        images: [],
        isActive: false,
        isNew: false,
        isSoldOut: false,
        updatedAt: '',
        variants: [
          {
            id: 1234567,
            createdAt: null,
            updatedAt: null,
            stock: null,
            price: null
          }
        ]
      };

      (addItemToCart as jest.Mock).mockReturnValueOnce({ basket: expectedCart });

      expect(await params.addToCart({ quantity: 1, currentCart: initialCart, product })).toEqual(expectedCart);
    });

    it('calls updateItemInCart endpoint and returns updated cart when product exists in cart', async () => {
      const initialCart: BasketResponseData = {
        cost: null,
        currencyCode: 'EUR',
        items: [{
          customData: null,
          displayData: null,
          key: '',
          packageId: 0,
          price: {total: null, unit: null},
          product: {
            id: 123
          } as any,
          quantity: 1,
          status: null,
          variant: null
        }],
        key: null,
        packages: []
      };
      const expectedCart = {
        cost: null,
        currencyCode: 'EUR',
        items: [{
          customData: null,
          displayData: null,
          key: '',
          packageId: 0,
          price: {total: null, unit: null},
          product: {
            id: 123
          } as any,
          quantity: 5,
          status: null,
          variant: null
        }],
        key: null,
        packages: []
      };

      const product: BapiProduct = {
        createdAt: '',
        id: 123,
        images: [],
        isActive: false,
        isNew: false,
        isSoldOut: false,
        updatedAt: ''
      };

      (updateItemInCart as jest.Mock).mockReturnValueOnce({ basket: expectedCart });

      expect(await params.addToCart({quantity: 5, currentCart: initialCart, product })).toEqual(expectedCart);
    });
  });

  it('updateQuantity calls updateItemInCart endpoint and returns updated cart', async () => {
    const initialCart: BasketResponseData = {
      cost: null,
      currencyCode: 'EUR',
      items: [{
        customData: null,
        displayData: null,
        key: '',
        packageId: 0,
        price: {total: null, unit: null},
        product: {
          id: 123
        } as any,
        quantity: 1,
        status: null,
        variant: null
      }],
      key: null,
      packages: []
    };
    const expectedCart = {
      cost: null,
      currencyCode: 'EUR',
      items: [{
        customData: null,
        displayData: null,
        key: 'foo-bar',
        packageId: 0,
        price: {total: null, unit: null},
        product: null,
        quantity: 100,
        status: null,
        variant: null
      }],
      key: null,
      packages: []
    };

    const product: BasketItem = {
      customData: null,
      displayData: null,
      key: 'foo-bar',
      packageId: 0,
      price: {total: null, unit: null},
      product: null,
      quantity: 100,
      status: null,
      variant: null
    };

    (updateItemInCart as jest.Mock).mockReturnValueOnce({ basket: expectedCart });

    expect(await params.updateQuantity({quantity: 5, currentCart: initialCart, product })).toEqual(expectedCart);
  });

  it('removeFromCart calls deleteItemFromCart endpoint and returns updated cart given product', async () => {
    const expectedCart = {
      items: [
        {id: 123}
      ]
    };

    const product: BasketItem = {
      customData: null,
      displayData: null,
      packageId: 0,
      price: {total: null, unit: null},
      product: null,
      quantity: 0,
      status: null,
      variant: null,
      key: '123'
    };

    (deleteItemFromCart as jest.Mock).mockReturnValueOnce(expectedCart);

    expect(await params.removeFromCart({ currentCart: null, product })).toEqual(expectedCart);
  });

  it('clearCart calls deleteItemFromCart endpoint for every product in the cart and returns updated cart with no items', async () => {
    const initialCart: BasketResponseData = {
      cost: null,
      currencyCode: 'EUR',
      items: [{
        customData: null,
        displayData: null,
        key: '',
        packageId: 0,
        price: {total: null, unit: null},
        product: {
          id: 123
        } as any,
        quantity: 1,
        status: null,
        variant: null
      }],
      key: null,
      packages: []
    };

    const expectedCart: BasketResponseData = {
      cost: null,
      currencyCode: 'EUR',
      items: [],
      key: null,
      packages: []
    };

    (deleteItemFromCart as jest.Mock).mockReturnValueOnce(expectedCart);

    expect(await params.clearCart({ currentCart: initialCart })).toEqual(expectedCart);
  });

  it('applyCoupon throws error that it\'s not supported', () => {
    const currentCart: BasketResponseData = {
      cost: null,
      currencyCode: 'EUR',
      items: [],
      key: null,
      packages: []
    };

    expect(params.applyCoupon({ currentCart, couponCode: 'foo' })).rejects.toThrow();
  });

  it('removeCoupon throws error that it\'s not supported', () => {
    const currentCart: BasketResponseData = {
      cost: null,
      currencyCode: 'EUR',
      items: [],
      key: null,
      packages: []
    };

    expect(params.removeCoupon({ currentCart, coupon: '' })).rejects.toThrow();
  });

  describe('isOnCart', () => {
    it('returns false if product does not exists in cart', () => {
      const currentCart: BasketResponseData = {
        cost: null,
        currencyCode: 'EUR',
        items: [],
        key: null,
        packages: []
      };

      const product: BapiProduct = {
        createdAt: '',
        id: 123,
        images: [],
        isActive: false,
        isNew: false,
        isSoldOut: false,
        updatedAt: ''
      };

      expect(params.isOnCart({ currentCart, product })).toEqual(false);
    });

    it('returns true if product exists in cart', () => {
      const currentCart: BasketResponseData = {
        cost: null,
        currencyCode: 'EUR',
        items: [{
          customData: null,
          displayData: null,
          key: '',
          packageId: 0,
          price: {total: null, unit: null},
          product: {
            id: 123
          } as any,
          quantity: 1,
          status: null,
          variant: null
        }],
        key: null,
        packages: []
      };

      const product: BapiProduct = {
        createdAt: '',
        id: 123,
        images: [],
        isActive: false,
        isNew: false,
        isSoldOut: false,
        updatedAt: ''
      };

      expect(params.isOnCart({ currentCart, product })).toEqual(true);
    });
  });
});
