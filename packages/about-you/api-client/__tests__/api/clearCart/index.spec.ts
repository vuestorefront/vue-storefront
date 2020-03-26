import clearCart from '../../../src/api/clearCart';
import { apiClient } from '../../../src/index';

jest.mock('../../../src/index', () => ({
  apiClient: {
    basket: {
      get: jest.fn(),
      deleteItem: jest.fn()
    }
  }
}));

describe('[about-you-api-client] clearCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('removes items from cart', async () => {
    const clearCartParams = { basketKey: '' };
    const result = [{ key: 'item-key' }];

    (apiClient.basket.get as any).mockReturnValueOnce({
      basket: {
        items: result
      }
    });

    await clearCart(clearCartParams);
    expect(apiClient.basket.deleteItem).toHaveBeenCalledWith(clearCartParams.basketKey, result[0].key);
  });

  it('does not call deleteItem if basket is empty', async () => {
    const clearCartParams = { basketKey: '' };
    const result = [];

    (apiClient.basket.get as any).mockReturnValueOnce({
      basket: {
        items: result
      }
    });

    await clearCart(clearCartParams);
    expect(apiClient.basket.deleteItem).not.toHaveBeenCalled();
  });
});
