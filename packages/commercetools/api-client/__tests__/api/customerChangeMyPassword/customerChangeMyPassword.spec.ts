import customerChangeMyPassword from '../../../src/api/customerChangeMyPassword';
import { apolloClient } from '../../../src/index';
import defaultMutation from '../../../src/api/customerChangeMyPassword/defaultMutation';

describe('[commercetools-api-client] customerChangeMyPassword', () => {
  it('changes user password', async () => {
    const givenVariables = {
      version: 364964457,
      currentPassword: 'currentPassword',
      newPassword: 'newPassword'
    };

    (apolloClient.mutate as any).mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(givenVariables);
      expect(mutation).toEqual(defaultMutation);

      return { data: 'user response' };
    });

    const { data } = await customerChangeMyPassword(givenVariables.version, givenVariables.currentPassword, givenVariables.newPassword);

    expect(data).toBe('user response');
  });
});
