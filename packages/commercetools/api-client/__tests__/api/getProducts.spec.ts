import getProduct from '../../src/api/getProduct';
import defaultQuery from '../../src/api/getProduct/defaultQuery';

describe('[commercetools-api-client] getProduct', () => {
  it('fetches product with default query', async () => {
    const givenVariables = {
      where: 'masterData(current(categories(id in ("724b250d-9805-4657-ae73-3c02a63a9a13"))))',
      acceptLanguage: ['en', 'de'],
      locale: 'en',
      currency: 'USD',
      country: 'UK'
    };

    const context = {
      config: {
        locale: 'en',
        acceptLanguage: ['en', 'de'],
        currency: 'USD',
        country: 'UK'
      },
      client: {
        query: ({ variables, query }) => {
          expect(variables).toEqual(givenVariables);
          expect(query).toEqual(defaultQuery);

          return { data: 'product response' };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const { data } = await getProduct(context, { catId: ['724b250d-9805-4657-ae73-3c02a63a9a13'] });

    expect(data).toBe('product response');
  });
});
