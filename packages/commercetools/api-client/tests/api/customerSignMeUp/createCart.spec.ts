import customerSignMeUp from '../../../src/api/customerSignMeUp'
import { apolloClient } from '../../../src/index'
import defaultMutation from '../../../src/api/customerSignMeUp/defaultMutation'

describe('[commercetools-api-client] customerSignMeUp', () => {
  it('creates a new cart', async () => {
    const givenVariables = {
      draft: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        password: 'xxxxx'
      }
    };

    (apolloClient.mutate as any).mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(givenVariables)
      expect(mutation).toEqual(defaultMutation)

      return { data: 'user response' }
    })

    const { data } = await customerSignMeUp(givenVariables.draft)

    expect(data).toBe('user response')
  });
});
