import getOrders from '../../src/api/getOrders';
import defaultQuery from '../../src/api/getOrders/defaultQuery';
import { OrderWhereSearch } from '../../src/types/Api';

describe('[commercetools-api-client] getOrders', () => {
  let givenVariables: any;
  let params: OrderWhereSearch;

  beforeEach(() => {
    givenVariables = {
      acceptLanguage: ['en', 'de'],
      locale: 'en',
      where: null,
      limit: 10,
      offset: 0,
      sort: undefined
    };
    params = {
      limit: 10,
      offset: 0
    };
  });

  it('fetches current user orders data', async () => {
    givenVariables.where = 'id="fvdrt8gaw4r"';
    params.id = 'fvdrt8gaw4r';
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
      extendQuery: (customQuery, args) => args
    };

    const { data } = await getOrders(context, params);
    expect(data).toBe('me response');
  });

  it('fetches current user orders data by orderNumber', async () => {
    givenVariables.where = 'orderNumber="1234"';
    params.orderNumber = '1234';
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
      extendQuery: (customQuery, args) => args
    };

    const { data } = await getOrders(context, params);
    expect(data).toBe('me response');
  });
});
