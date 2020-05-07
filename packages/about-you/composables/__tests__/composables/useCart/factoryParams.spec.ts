import {
  getCart,
  deleteItemFromCart
} from '@vue-storefront/about-you-api';
import { params } from '../../../src/composables/useCart/factoryParams';
import {BasketItem} from '@aboutyou/backbone/endpoints/basket/getBasket';

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
});
