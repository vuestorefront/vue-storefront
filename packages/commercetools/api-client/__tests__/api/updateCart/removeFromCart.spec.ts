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
    const context = {
      config: {
        locale: 'en',
        acceptLanguage: ['en', 'de'],
        currency: 'USD',
        country: 'UK'
      },
      client: {
        mutate: () => ({
          actions: [
            { removeLineItem: { quantity: 2, lineItemId: 1} }
          ],
          id: 1,
          version: 1
        })
      }
    };

    const product = {
      id: 1,
      sku: '123',
      quantity: 2
    } as any;
    const response = await removeFromCart(context, cart, product);

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
