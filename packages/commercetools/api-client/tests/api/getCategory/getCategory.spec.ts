import gql from 'graphql-tag'
import getCategory from '../../../src/api/getCategory'
import { apolloClient } from '../../../src/index'
import defaultQuery from '../../../src/api/getCategory/defaultQuery'

describe('[commercetools-api-client] getCategory', () => {
  it('fetches categories with default query', async () => {
    const givenVariables = {
      where: 'id="724b250d-9805-4657-ae73-3c02a63a9a13"',
      locale: 'en',
    };

    (apolloClient.query as any).mockImplementation(({ variables, query }) => {
      expect(variables).toEqual(givenVariables)
      expect(query).toEqual(defaultQuery)

      return { data: 'category response' }
    })

    const { data } = await getCategory({ catId: "724b250d-9805-4657-ae73-3c02a63a9a13" })

    expect(data).toBe('category response')
  });

  it('fetches categories with customized query', async () => {
    const givenVariables = {
      where: 'test',
      locale: 'de',
    };

    const givenQuery = `
      query categories($where: String, $sort: [String!], $limit: Int, $offset: Int, $locale: Locale) {
        categories(where: $where, sort: $sort, limit: $limit, offset: $offset) {
          offset
          count
          total
          results {
            id
            name(locale: $locale)
          }
        }
      }
    `;

    (apolloClient.query as any).mockImplementation(({ variables, query }) => {
      expect(variables).toEqual(givenVariables)
      expect(query).not.toEqual(defaultQuery)
      expect(query).toEqual(gql`${givenQuery}`)

      return { data: 'category response' }
    })

    const { data } = await getCategory({ customQuery: { query: givenQuery, variables: givenVariables} })

    expect(data).toBe('category response')
  });
});
