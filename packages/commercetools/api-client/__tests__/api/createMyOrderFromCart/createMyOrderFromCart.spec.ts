import createMyOrderFromCart from '../../../src/api/createMyOrderFromCart';
import { apolloClient } from '../../../src/index';
import defaultMutation from '../../../src/api/createMyOrderFromCart/defaultMutation';

jest.unmock('./../../../src/api/createMyOrderFromCart');

describe('[commercetools-api-client] createMyOrderFromCart', () => {
  it('creates a new order', async () => {
    const givenVariables = {
      draft: {
        id: '123123',
        version: 2
      },
      locale: 'en'
    };

    (apolloClient.mutate as any).mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(givenVariables);
      expect(mutation).toEqual(defaultMutation);

      return { data: 'order response' };
    });

    const { data } = await createMyOrderFromCart({ id: '123123',
      version: 2 });

    expect(data).toBe('order response');
  });
});
