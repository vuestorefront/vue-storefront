import removeCartCoupon from './../../../src/api/removeCartCoupon';

const cart = {
  id: 1,
  version: 1
} as any;

describe('[commercetools-api-client] removeCartCoupon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('removes coupon from the cart', async () => {
    const response = await removeCartCoupon(cart, { typeId: '123', id: '123'});

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
