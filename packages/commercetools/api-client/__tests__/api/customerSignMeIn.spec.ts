import customerSignMeIn from '../../src/api/customerSignMeIn';
import defaultMutation from '../../src/api/customerSignMeIn/defaultMutation';

describe('[commercetools-api-client] customerSignMeIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates user session', async () => {
    const givenVariables = {
      draft: {
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

    const { data } = await customerSignMeIn(context, givenVariables.draft);
    expect(data).toBe('user response');
  });
});
