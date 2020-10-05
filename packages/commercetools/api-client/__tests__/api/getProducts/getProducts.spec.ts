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
    const newQuery = gql`
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

    const newVariables = { id: 1 };

    const customQuery = (currentQuery, currentVariables) => {
      expect(currentQuery).toEqual(defaultQuery);
      expect(currentVariables).toEqual({
        acceptLanguage: ['en', 'de'],
        country: 'UK',
        currency: 'USD',
        locale: 'en',
        offset: undefined,
        skus: undefined,
        limit: undefined,
        where: 'masterData(current(categories(id in ("724b250d-9805-4657-ae73-3c02a63a9a13"))))'
      });

      return {
        query: newQuery,
        variables: newVariables
      };
    };

    (apolloClient.query as any).mockImplementation(({ query, variables }) => {
      return { query, variables };
    });

    const data: any = await getProduct({ catId: ['724b250d-9805-4657-ae73-3c02a63a9a13'] }, customQuery);

    expect(data.query).toEqual(newQuery);
    expect(data.variables).toEqual(newVariables);
  });
});
