import getOrders from '../../src/api/getOrders';
import defaultQuery from '../../src/api/getOrders/defaultQuery';
import { OrderWhereSearch } from '../../src/types/Api';

describe('[commercetools-api-client] getOrders', () => {
  const params: OrderWhereSearch = {
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
  it('fetches current user orders data', async () => {
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
          return { data: 'me response' };
        }
      },
      extendQuery: (args) => args
    };

    const { data } = await getOrders(context, params);
    expect(data).toBe('me response');
  });
});
