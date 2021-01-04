import addToCart from '../../src/api/addToCart';

const cart = {
  id: 1,
  version: 1
} as any;

describe('[commercetools-api-client] addToCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('adds product to the cart', async () => {
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
            { addLineItem: {quantity: 2, sku: '123', variantId: 1} }
          ],
          id: 1,
          version: 1
        })
      }
    };
    const product = { id: 1,
      sku: '123' } as any;

    const response = await addToCart(context, cart, product, 2);

    expect(response).toEqual({
      id: 1,
      version: 1,
      actions: [
        {
          addLineItem: {
            variantId: 1,
            sku: '123',
            quantity: 2
          }
        }
      ]
    });
  });
});
