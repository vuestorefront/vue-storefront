import getMe from '../../../src/api/getMe';
import { apolloClient } from '../../../src/index';
import { basicProfile } from '../../../src/api/getMe/defaultQuery';
import gql from 'graphql-tag';

describe('[commercetools-api-client] getMe', () => {
  it('fetches current user data', async () => {
    const givenVariables = {
      acceptLanguage: ['en', 'de'],
      locale: 'en'
    };

    (apolloClient.query as any).mockImplementation(({ variables, query }) => {
      expect(variables).toEqual(givenVariables);
      expect(query).toEqual(basicProfile);

      return { data: 'me response' };
    });

    const { data } = await getMe();

    expect(data).toBe('me response');
  });

  it('fetches current user with custom query', async () => {
    const givenVariables = {
      acceptLanguage: ['en', 'de'],
      locale: 'en'
    };

    const newQuery = gql`
      query someQuery {
        someQuery { id }
      }
    `;
    const newVariables = { id: 1 };

    const customQuery = (defaultQuery, defaultVariables) => {
      expect(defaultQuery).toEqual(basicProfile);
      expect(defaultVariables).toEqual(givenVariables);

      return {
        query: newQuery,
        variables: newVariables
      };
    };

    (apolloClient.query as any).mockImplementation(({ query, variables }) => {
      return { query, variables };
    });

    const data: any = await getMe({ customer: false }, customQuery);

    expect(data.query).toBe(newQuery);
    expect(data.variables).toBe(newVariables);
  });
});
