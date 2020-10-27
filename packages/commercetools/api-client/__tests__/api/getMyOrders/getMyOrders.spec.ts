import getOrders from '../../../src/api/getMyOrders';
import { apolloClient } from '../../../src/index';
import defaultQuery from '../../../src/api/getMyOrders/defaultQuery';
import { OrderWhereSearch } from '../../../src/types/Api';

describe('[commercetools-api-client] getMyOrders', () => {
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
    (apolloClient.query as any).mockImplementation(({ variables, query }) => {
      expect(variables).toEqual(givenVariables);
      expect(query).toEqual(defaultQuery);
      return { data: 'me response' };
    });
    const { data } = await getOrders(params);
    expect(data).toBe('me response');
  });

  it('fetches current user orders data with custom variables', async () => {
    (apolloClient.query as any).mockImplementation(({ variables, query }) => {
      expect({ ...variables, where: 'id="fvdrt8gaw4r"' }).toEqual(givenVariables);
      expect(query).toEqual(defaultQuery);
      return { data: 'me response' };
    });
    const { data } = await getOrders(params, (query = defaultQuery, variables = givenVariables) => ({ query, variables }));
    expect(data).toBe('me response');
  });
});
