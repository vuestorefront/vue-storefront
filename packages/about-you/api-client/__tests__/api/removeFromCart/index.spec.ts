import removeFromCart from '../../../src/api/removeFromCart';
import { apiClient } from '../../../src/index';

jest.mock('../../../src/index', () => ({
  apiClient: {
    basket: {
      deleteItem: jest.fn()
    }
  }
}));

describe('[about-you-api-client] removeFromCart', () => {
  it('removes one item from cart', async () => {
    const removeFromBasketParams = {
      basketKey: '',
      itemKey: ''
    };

    await removeFromCart(removeFromBasketParams);

    expect(apiClient.basket.deleteItem).toHaveBeenCalledWith(removeFromBasketParams.basketKey, removeFromBasketParams.itemKey);
  });
});
