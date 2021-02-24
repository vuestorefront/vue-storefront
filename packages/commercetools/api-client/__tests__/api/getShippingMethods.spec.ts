import getShippingMethods from '../../src/api/getShippingMethods';
import defaultQuery from '../../src/api/getShippingMethods/defaultQuery';

describe('[commercetools-api-client] getShippingMethods', () => {
  it('fetches shipping methods', async () => {
    const context = {
      config: {
        locale: 'en',
        acceptLanguage: ['en', 'de'],
        currency: 'USD'
      },
      client: {
        query: ({ query }) => {
          expect(query).toEqual(defaultQuery);

          return { data: 'shipping response' };
        }
      },
      createQuery: (args) => args
    };

    const { data } = await getShippingMethods(context);

    expect(data).toBe('shipping response');
  });
});
