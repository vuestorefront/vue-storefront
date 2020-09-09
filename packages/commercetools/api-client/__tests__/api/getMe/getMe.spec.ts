import getMe from '../../../src/api/getMe';
import { apolloClient } from '../../../src/index';
import { basicProfile } from '../../../src/api/getMe/defaultQuery';

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

  it('fetches current user with custom variables', async () => {
    const givenVariables = {
      acceptLanguage: ['en', 'de'],
      locale: 'de'
    };

    (apolloClient.query as any).mockImplementation(({ variables }) => {
      expect(variables).toEqual(givenVariables);

      return { data: 'me response' };
    });

    const { data } = await getMe({ customer: false }, (query = {}, variables = givenVariables) => ({ query, variables }));

    expect(data).toBe('me response');
  });
});
