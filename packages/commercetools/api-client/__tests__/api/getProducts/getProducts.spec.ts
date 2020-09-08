import gql from 'graphql-tag';
import getProduct from './../../../src/api/getProduct';
import { apolloClient } from './../../../src/index';
import defaultQuery from './../../../src/api/getProduct/defaultQuery';

describe('[commercetools-api-client] getProduct', () => {
  it('fetches product with default query', async () => {
    const givenVariables = {
      where: 'masterData(current(categories(id in ("724b250d-9805-4657-ae73-3c02a63a9a13"))))',
      acceptLanguage: ['en', 'de'],
      locale: 'en',
      currency: 'USD',
      country: 'UK'
    };

    (apolloClient.query as any).mockImplementation(({ variables, query }) => {
      expect(variables).toEqual(givenVariables);
      expect(query).toEqual(defaultQuery);

      return { data: 'product response' };
    });

    const { data } = await getProduct({ catId: ['724b250d-9805-4657-ae73-3c02a63a9a13'] });

    expect(data).toBe('product response');
  });

  it('fetches product with customized query', async () => {
    const givenQuery = `
      query products(
        $where: String
        $sort: [String!]
        $limit: Int
        $offset: Int
        $skus: [String!]
        $acceptLanguage: [Locale!]
        $currency: Currency!
      ) {
        products(where: $where, sort: $sort, limit: $limit, offset: $offset, skus: $skus) {
          results {
            id
          }
        }
      }
    `;

    (apolloClient.query as any).mockImplementation(({ query }) => {
      expect(query).not.toEqual(defaultQuery);
      expect(query).toEqual(gql`${givenQuery}`);

      return { data: 'product response' };
    });

    const { data } = await getProduct({ catId: ['724b250d-9805-4657-ae73-3c02a63a9a13'] }, (query = givenQuery, variables = { offset: 2 }): any => ({ query, variables }));

    expect(data).toBe('product response');
  });
});
