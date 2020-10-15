import deleteCart from '../../../src/api/deleteCart';
import { apolloClient } from '../../../src/index';
import defaultMutation from '../../../src/api/deleteCart/defaultMutation';

describe('[commercetools-api-client] deleteCart', () => {
  it('deletes existing cart', async () => {
    const givenVariables = {
      acceptLanguage: ['en', 'de'],
      locale: 'en',
      id: 'unique-id',
      version: 1
    };

    (apolloClient.mutate as any).mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(givenVariables);
      expect(mutation).toEqual(defaultMutation);

      return {
        data: {
          items: [],
          id: 'cart-id'
        }
      };
    });

    const { data } = await deleteCart('unique-id', 1);

    expect(data).toEqual({
      items: [],
      id: 'cart-id'
    });
  });

});
