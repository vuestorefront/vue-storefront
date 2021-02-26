import getCategory from '../../src/api/getCategory';
import defaultQuery from '../../src/api/getCategory/defaultQuery';

describe('[commercetools-api-client] getCategory', () => {
  it('fetches categories without search parameters', async () => {
    const givenVariables = {
      acceptLanguage: ['en', 'de']
    };

    const context = {
      config: {
        locale: 'en',
        acceptLanguage: ['en', 'de'],
        currency: 'USD'
      },
      client: {
        query: ({ variables, query }) => {
          expect(variables).toEqual(givenVariables);
          expect(query).toEqual(defaultQuery);

          return { data: 'category response' };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const { data } = await getCategory(context, null);

    expect(data).toBe('category response');
  });

  it('fetches categories with default query', async () => {
    const givenVariables = {
      where: 'id="724b250d-9805-4657-ae73-3c02a63a9a13"',
      acceptLanguage: ['en', 'de']
    };

    const context = {
      config: {
        locale: 'en',
        acceptLanguage: ['en', 'de'],
        currency: 'USD'
      },
      client: {
        query: ({ variables, query }) => {
          expect(variables).toEqual(givenVariables);
          expect(query).toEqual(defaultQuery);

          return { data: 'category response' };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const { data } = await getCategory(context, { catId: '724b250d-9805-4657-ae73-3c02a63a9a13' });

    expect(data).toBe('category response');
  });
});
