import updateCart from '../../../src/api/updateCart';
import { apolloClient } from '../../../src/index';
import defaultMutation from '../../../src/api/updateCart/defaultMutation';
import gql from 'graphql-tag';

jest.unmock('./../../../src/api/updateCart');

const givenVariables = {
  acceptLanguage: ['en', 'de'],
  locale: 'en',
  id: 'cart id',
  version: 1,
  actions: [{ addLineItem: {} }]
};

describe('[commercetools-api-client] updateCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates cart', async () => {
    (apolloClient.mutate as any).mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(givenVariables);
      expect(mutation).toEqual(defaultMutation);

      return { data: 'cart response' };
    });

    const { data } = await updateCart({
      id: 'cart id',
      version: 1,
      actions: [{ addLineItem: {} }]
    });

    expect(data).toBe('cart response');
  });

  it('uses a custom query', async () => {
    (apolloClient.mutate as any).mockImplementation(({ variables, mutation }) => {
      return { variables, mutation };
    });

    const query = gql(`
      mutation updateCart {
        updateCart {
          id
        }
      }
    `);
    const variables = { id: 123 };

    const customQuery = (currentQuery, currentVariables) => {

      expect(currentQuery).toEqual(defaultMutation);
      expect(currentVariables).toEqual(givenVariables);

      return { query, variables };
    };

    const data: any = await updateCart({
      id: 'cart id',
      version: 1,
      actions: [{ addLineItem: {} }]
    }, customQuery);

    expect(data.variables).toEqual(variables);
    expect(data.query).toEqual(query);
  });
});
