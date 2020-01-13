import createCart from '../../../src/api/createCart'
import { apolloClient } from '../../../src/index'
import defaultMutation from '../../../src/api/createCart/defaultMutation'

describe('[commercetools-api-client] createCart', () => {
  it('creates a new cart', async () => {
    const givenVariables = {
      locale: 'en',
      draft: {
        currency: 'USD',
      }
    };

    (apolloClient.mutate as any).mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(givenVariables)
      expect(mutation).toEqual(defaultMutation)

      return { data: 'cart response' }
    })

    const { data } = await createCart()

    expect(data).toBe('cart response')
  });
});
