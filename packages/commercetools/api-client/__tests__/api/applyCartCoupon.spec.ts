import applyCartCoupon from '../../src/api/applyCartCoupon';

const cart = {
  id: 1,
  version: 1
} as any;

describe('[commercetools-api-client] applyCartCoupon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('applies coupon to the cart', async () => {
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
            { addDiscountCode: { code: 'coupon' } }
          ],
          id: 1,
          version: 1
        })
      },
      createQuery: (args) => args
    };

    const response = await applyCartCoupon(context, cart, 'coupon');

    expect(response).toEqual({
      id: 1,
      version: 1,
      actions: [
        {
          addDiscountCode: {
            code: 'coupon'
          }
        }
      ]
    });
  });
});
