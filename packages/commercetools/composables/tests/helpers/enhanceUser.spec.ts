import enhanceUser from './../../src/helpers/internals/enhanceUser';

const createUserResponse = (cartItems): any => ({
  data: {
    user: {
      cart: {
        lineItems: cartItems
      }
    }
  }
});

describe('[commercetools-composables] enhanceUser', () => {
  it('returns cart response items configurations', () => {
    const profileResponse = createUserResponse([
      { prod: '1',
        variant: { attributeList: [{ name: 'attr1',
          value: '20' }] } }
    ]);

    expect(enhanceUser(profileResponse)).toEqual({
      data: {
        user: {
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
      }
    });
  });
});
