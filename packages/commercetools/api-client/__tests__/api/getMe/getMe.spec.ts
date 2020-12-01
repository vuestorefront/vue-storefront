import getMe from '../../../src/api/getMe';
import { basicProfile } from '../../../src/api/getMe/defaultQuery';
import gql from 'graphql-tag';

describe('[commercetools-api-client] getMe', () => {
  it('fetches current user data', async () => {
    const givenVariables = {
      acceptLanguage: ['en', 'de'],
      locale: 'en'
    };

    const context = {
      config: {
        locale: 'en',
        acceptLanguage: ['en', 'de'],
        currency: 'USD'
      },
      client: {
        query: ({ variables, query }) => {
          expect(variables).toEqual(givenVariables);
          expect(query).toEqual(basicProfile);

          return { data: 'me response' };
        }
      }
    };

    const { data } = await getMe(context);

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

    const context = {
      config: {
        locale: 'en',
        acceptLanguage: ['en', 'de'],
        currency: 'USD'
      },
      client: {
        query: ({ query, variables }) => {
          return { query, variables };
        }
      }
    };

    const data: any = await getMe(context, { customer: false }, customQuery);

    expect(data.query).toBe(newQuery);
    expect(data.variables).toBe(newVariables);
  });
});
