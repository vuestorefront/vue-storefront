import gql from 'graphql-tag'
import getProduct from './../../../src/api/getProduct'
import { apolloClient } from './../../../src/index'
import defaultQuery from './../../../src/api/getProduct/defaultQuery'

describe('[commercetools-api-client] getProduct', () => {
  it('fetches product with default query', async () => {
    const givenVariables = {
      where: 'masterData(current(categories(id in ("724b250d-9805-4657-ae73-3c02a63a9a13"))))',
      locale: 'en',
      currency: 'USD'
    };

    (apolloClient.query as any).mockImplementation(({ variables, query }) => {
      expect(variables).toEqual(givenVariables)
      expect(query).toEqual(defaultQuery)

      return { data: 'product response' }
    })

    const { data } = await getProduct({ catIds: ["724b250d-9805-4657-ae73-3c02a63a9a13"] })

    expect(data).toBe('product response')
  });

  it('fetches product with customized query', async () => {
    const givenVariables = {
      where: 'test',
      locale: 'de',
      currency: 'eur'
    };

    const givenQuery = `
      query products(
        $where: String
        $sort: [String!]
        $limit: Int
        $offset: Int
        $skus: [String!]
        $locale: Locale
        $currency: Currency!
      ) {
        products(where: $where, sort: $sort, limit: $limit, offset: $offset, skus: $skus) {
          results {
            id
          }
        }
      }
    `;

    (apolloClient.query as any).mockImplementation(({ variables, query }) => {
      expect(variables).toEqual(givenVariables)
      expect(query).not.toEqual(defaultQuery)
      expect(query).toEqual(gql`${givenQuery}`)

      return { data: 'product response' }
    })

    const { data } = await getProduct({ customQuery: { query: givenQuery, variables: givenVariables} })

    expect(data).toBe('product response')
  });
});
