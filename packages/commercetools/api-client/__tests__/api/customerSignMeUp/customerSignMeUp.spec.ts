import customerSignMeUp from '../../../src/api/customerSignMeUp';
import defaultMutation from '../../../src/api/customerSignMeUp/defaultMutation';

describe('[commercetools-api-client] customerSignMeUp', () => {

  it('creates user account', async () => {
    const givenVariables = {
      draft: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        password: 'xxxxx'
      },
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
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(givenVariables);
          expect(mutation).toEqual(defaultMutation);

          return { data: 'user response' };
        }
      }
    };

    const { data } = await customerSignMeUp(context, givenVariables.draft);
    expect(data).toBe('user response');
  });
});
