import applyCartCoupon from './../../../src/api/applyCartCoupon';

const cart = {
  id: 1,
  version: 1
} as any;

describe('[commercetools-api-client] applyCartCoupon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('applies coupon to the cart', async () => {
    const response = await applyCartCoupon(cart, 'coupon');

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
