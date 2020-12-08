import getCart from '../../src/api/getCart';
import defaultQuery from '../../src/api/getCart/defaultQuery';

describe('[commercetools-api-client] getCart', () => {
  it('fetches cart', async () => {
    const givenVariables = {
      acceptLanguage: ['en', 'de'],
      locale: 'en',
      cartId: 'cart id'
    };

    const context = {
      config: {
        locale: 'en',
        acceptLanguage: ['en', 'de'],
        currency: 'USD'
      },
      client: {
        query: ({ variables, query }) => {
          expect(variables).toEqual(givenVariables);
          expect(query).toEqual(defaultQuery);

          return { data: 'cart response' };
        }
      }
    };

    const { data } = await getCart(context, 'cart id');

    expect(data).toBe('cart response');
  });
});
