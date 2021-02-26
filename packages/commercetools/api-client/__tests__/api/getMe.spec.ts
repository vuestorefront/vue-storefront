import getMe from '../../src/api/getMe';
import { basicProfile } from '../../src/api/getMe/defaultQuery';

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
      },
      extendQuery: (args) => args
    };

    const { data } = await getMe(context);

    expect(data).toBe('me response');
  });
});
