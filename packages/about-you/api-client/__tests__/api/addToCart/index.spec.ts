import addToCart from '../../../src/api/addToCart';
import { apiClient } from '../../../src/index';

jest.mock('../../../src/index', () => ({
  apiClient: {
    basket: {
      addItem: jest.fn()
    }
  }
}));

describe('[about-you-api-client] addToCart', () => {
  it('adds item to cart', async () => {
    const addToBasketParams = {
      basketKey: '',
      variantId: 1
    };

    await addToCart(addToBasketParams);

    expect(apiClient.basket.addItem).toHaveBeenCalledWith(addToBasketParams.basketKey, addToBasketParams.variantId);
  });
});
