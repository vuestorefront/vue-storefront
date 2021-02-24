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
      },
      createQuery: (args) => args
    };

    const { data } = await createMyOrderFromCart(context, { id: '123123', version: 2 });
    expect(data).toBe('order response');
  });
});
