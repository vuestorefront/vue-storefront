import enhanceCart from './../../src/helpers/internals/enhanceCart';

const createCartResponse = (items): any => ({
  data: {
    cart: {
      lineItems: items
    }
  }
});

describe('[commercetools-composables] enhanceCart', () => {
  it('returns cart response items configurations', () => {
    const cartResponse = createCartResponse([
      { prod: '1',
        variant: { attributeList: [{ name: 'attr1',
          value: '20' }] } }
    ]);

    expect(enhanceCart(cartResponse)).toEqual({
      data: {
        cart: {
          lineItems: [
            {
              prod: '1',
              variant: { attributeList: [{ name: 'attr1',
                value: '20' }] },
              _configuration: [{ name: 'attr1',
                value: '20' }]
            }
          ]
        }
      }
    });
  });
});
