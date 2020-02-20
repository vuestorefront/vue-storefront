import customerSignMeIn from '../../../src/api/customerSignMeIn';
import { apolloClient } from '../../../src/index';
import defaultMutation from '../../../src/api/customerSignMeIn/defaultMutation';

describe('[commercetools-api-client] customerSignMeIn', () => {
  it('creates user session', async () => {
    const givenVariables = {
      draft: {
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

    const { data } = await customerSignMeIn(givenVariables.draft);

    expect(data).toBe('user response');
  });
});
