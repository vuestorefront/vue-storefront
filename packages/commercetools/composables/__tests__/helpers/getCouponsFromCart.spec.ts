import getCouponsFromCart from '../../src/helpers/internals/getCouponsFromCart';

const cart = {
  discountCodes: [
    {
      discountCode: {
        id: '1',
        name: 'NAME',
        code: 'CODE'
      }
    }
  ]
};

describe('[commercetools-composables] getCouponsFromCart', () => {
  it('returns undefined if cart doesn\'t have discount codes', () => {
    expect(getCouponsFromCart({} as any)).toBeUndefined();
  });

  it('adds \'value\' property', () => {
    expect(getCouponsFromCart(cart as any)).toEqual([
      {
        ...cart.discountCodes[0].discountCode,
        value: null
      }
    ]);
  });
});
