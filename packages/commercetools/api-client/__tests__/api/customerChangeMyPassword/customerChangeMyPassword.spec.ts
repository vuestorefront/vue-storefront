import customerChangeMyPassword from '../../../src/api/customerChangeMyPassword';
import defaultMutation from '../../../src/api/customerChangeMyPassword/defaultMutation';

describe('[commercetools-api-client] customerChangeMyPassword', () => {
  it('changes user password', async () => {
    const givenVariables = {
      version: 364964457,
      currentPassword: 'currentPassword',
      newPassword: 'newPassword'
    };

    const context = {
      config: {},
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(givenVariables);
          expect(mutation).toEqual(defaultMutation);

          return { data: 'user response' };
        }
      }
    };

    const { data } = await customerChangeMyPassword(context, givenVariables.version, givenVariables.currentPassword, givenVariables.newPassword);

    expect(data).toBe('user response');
  });
});
