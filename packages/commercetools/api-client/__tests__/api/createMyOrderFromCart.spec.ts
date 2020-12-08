import createMyOrderFromCart from '../../src/api/createMyOrderFromCart';
import defaultMutation from '../../src/api/createMyOrderFromCart/defaultMutation';

jest.unmock('../../src/api/createMyOrderFromCart');

const givenVariables = {
  draft: {
    id: '123123',
    version: 2
  },
  acceptLanguage: ['en', 'de'],
  locale: 'en'
};

describe('[commercetools-api-client] createMyOrderFromCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('creates a new order', async () => {
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
          return { data: 'order response' };
        }
      }
    };

    const { data } = await createMyOrderFromCart(context, { id: '123123', version: 2 });
    expect(data).toBe('order response');
  });

  it('creates new order with custom query', async () => {
    const customQuery = defaultMutation;
    const customVariables = {
      locale: 'de'
    };

    const context = {
      config: {
        locale: 'en',
        acceptLanguage: ['en', 'de'],
        currency: 'USD'
      },
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual({ ...givenVariables, ...customVariables });
          expect(mutation).toEqual(defaultMutation);
          return { data: 'order response' };
        }
      }
    };

    const { data } = await createMyOrderFromCart(context, { id: '123123', version: 2 }, (query, variables) => {
      return {
        query: customQuery,
        variables: {
          ...variables,
          ...customVariables
        }
      };
    });
    expect(data).toBe('order response');
  });
});
