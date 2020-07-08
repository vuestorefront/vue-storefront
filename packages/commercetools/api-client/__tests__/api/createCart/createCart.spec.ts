import createCart from '../../../src/api/createCart';
import { apolloClient } from '../../../src/index';
import defaultMutation from '../../../src/api/createCart/defaultMutation';

describe('[commercetools-api-client] createCart', () => {
  it('creates a new cart with draft', async () => {
    const givenVariables = {
      acceptLanguage: ['en', 'de'],
      locale: 'en',
      draft: {
        currency: 'USD',
        items: [],
        id: 'cart-id'
      }
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

    const { data } = await createCart({
      items: [],
      id: 'cart-id'
    } as any);

    expect(data).toEqual({
      items: [],
      id: 'cart-id'
    });
  });

  it('creates a new cart without draft', async () => {
    const givenVariables = {
      acceptLanguage: ['en', 'de'],
      locale: 'en',
      draft: {
        currency: 'USD'
      }
    };

    (apolloClient.mutate as any).mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(givenVariables);
      expect(mutation).toEqual(defaultMutation);

      return {
        data: {}
      };
    });

    const { data } = await createCart();

    expect(data).toEqual({});
  });
});
