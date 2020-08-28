import customerSignMeIn from '../../../src/api/customerSignMeIn';
import { apolloClient, getSettings } from '../../../src/index';
import defaultMutation from '../../../src/api/customerSignMeIn/defaultMutation';
import createAccessToken from '../../../src/helpers/createAccessToken';

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

    (apolloClient.mutate as any).mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(givenVariables);
      expect(mutation).toEqual(defaultMutation);
      return { data: 'user response' };
    });

    const { data } = await customerSignMeIn(givenVariables.draft);
    const { auth } = getSettings();
    expect(createAccessToken).toBeCalled();
    expect(auth.onTokenChange).toBeCalled();
    expect(data).toBe('user response');
  });
});
