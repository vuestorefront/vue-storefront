import removeFromCart from './../../../src/api/removeFromCart';

const cart = {
  id: 1,
  version: 1
} as any;

describe('[commercetools-api-client] removeFromCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('removes product from cart', async () => {
    const product = { id: 1,
      sku: '123',
      qty: 2 } as any;
    const response = await removeFromCart(cart, product);

    expect(response).toEqual({
      id: 1,
      version: 1,
      actions: [
        {
          removeLineItem: {
            lineItemId: 1,
            quantity: 2
          }
        }
      ]
    });
  });
});
