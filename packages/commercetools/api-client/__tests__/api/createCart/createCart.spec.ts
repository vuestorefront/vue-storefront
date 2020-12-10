import createCart from '../../../src/api/createCart';
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

          return {
            data: {
              items: [],
              id: 'cart-id'
            }
          };
        }
      }
    };

    const { data } = await createCart(context, {
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

          return {
            data: {}
          };
        }
      }
    };

    const { data } = await createCart(context);

    expect(data).toEqual({});
  });
});
