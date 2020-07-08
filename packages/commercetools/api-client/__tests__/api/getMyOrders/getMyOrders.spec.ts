import getMyOrders from '../../../src/api/getMyOrders';
import { apolloClient } from '../../../src/index';
import defaultQuery from '../../../src/api/getMyOrders/defaultQuery';
import { OrderSearch } from '../../../src/types/Api';

describe('[commercetools-api-client] getMyOrders', () => {
  it('fetches current user data', async () => {
    const search: OrderSearch = {
      id: 'fvdrt8gaw4r',
      limit: 10,
      offset: 0
    };
    const givenVariables = {
      acceptLanguage: ['en', 'de'],
      locale: 'en',
      where: 'id="fvdrt8gaw4r"',
      limit: 10,
      offset: 0,
      sort: undefined
    };

    (apolloClient.query as any).mockImplementation(({ variables, query }) => {
      expect(variables).toEqual(givenVariables);
      expect(query).toEqual(defaultQuery);

      return { data: 'me response' };
    });

    const { data } = await getMyOrders(search);

    expect(data).toBe('me response');
  });
});
