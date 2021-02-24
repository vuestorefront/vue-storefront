import removeCartCoupon from '../../src/api/removeCartCoupon';

const cart = {
  id: 1,
  version: 1
} as any;

describe('[commercetools-api-client] removeCartCoupon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('removes coupon from the cart', async () => {
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
            { removeDiscountCode: { discountCode: { id: '123', typeId: '123' } } }
          ],
          id: 1,
          version: 1
        })
      },
      createQuery: (args) => args
    };

    const response = await removeCartCoupon(context, cart, { typeId: '123', id: '123'});

    expect(response).toEqual({
      id: 1,
      version: 1,
      actions: [
        {
          removeDiscountCode: {
            discountCode: {
              id: '123',
              typeId: '123'
            }
          }
        }
      ]
    });
  });
});
