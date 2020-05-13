import customerSignMeUp from '../../../src/api/customerSignMeUp';
import { apolloClient, auth } from '../../../src/index';
import defaultMutation from '../../../src/api/customerSignMeUp/defaultMutation';
import createAccessToken from '../../../src/helpers/createAccessToken';

describe('[commercetools-api-client] customerSignMeUp', () => {

  it('creates user account', async () => {
    const givenVariables = {
      draft: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        password: 'xxxxx'
      },
      locale: 'en'
    };

    (apolloClient.mutate as any).mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(givenVariables);
      expect(mutation).toEqual(defaultMutation);

      return { data: 'user response' };
    });

    const { data } = await customerSignMeUp(givenVariables.draft);

    expect(createAccessToken).toBeCalled();
    expect(auth.onTokenChange).toBeCalled();
    expect(data).toBe('user response');
  });
});
