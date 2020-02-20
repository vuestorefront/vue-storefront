import getCart from '../../../src/api/getCart';
import { apolloClient } from '../../../src/index';
import defaultQuery from '../../../src/api/getCart/defaultQuery';

describe('[commercetools-api-client] getCart', () => {
  it('fetches cart', async () => {
    const givenVariables = {
      locale: 'en',
      cartId: 'cart id'
    };

    (apolloClient.query as any).mockImplementation(({ variables, query }) => {
      expect(variables).toEqual(givenVariables);
      expect(query).toEqual(defaultQuery);

      return { data: 'cart response' };
    });

    const { data } = await getCart('cart id');

    expect(data).toBe('cart response');
  });
});
