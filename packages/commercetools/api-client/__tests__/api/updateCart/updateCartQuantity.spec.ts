import updateCartQuantity from './../../../src/api/updateCartQuantity';

const cart = {
  id: 1,
  version: 1
} as any;

describe('[commercetools-api-client] updateCartQuantity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates cart product quantity', async () => {
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
            { changeLineItemQuantity: { quantity: 2, lineItemId: 1} }
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

    const response = await updateCartQuantity(context, cart, product);

    expect(response).toEqual({
      id: 1,
      version: 1,
      actions: [
        {
          changeLineItemQuantity: {
            lineItemId: 1,
            quantity: 2
          }
        }
      ]
    });
  });
});
