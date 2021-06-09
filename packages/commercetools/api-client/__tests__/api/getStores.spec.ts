import getStores from '../../src/api/getStores';
import { storesData } from '../../src/api/getStores/defaultQuery';

describe('[commercetools-api-client] getStores', () => {
  it('fetches store data', async () => {

    const response = {
      data: {
        stores: 'stores response'
      }
    };

    const extendQuery = jest.fn().mockImplementation(
      function (_, args) {
        return args;
      }
    );

    const query = jest.fn().mockReturnValue(
      response
    );

    const config = {
      locale: 'en'
    };

    const client = {
      query
    };

    const context = {
      config,
      client,
      extendQuery
    };

    expect(await getStores(context, undefined)).toBe(response.data.stores);
    expect(extendQuery).toHaveBeenCalled();
    expect(query).toHaveBeenCalledWith({ variables: { ...config }, query: storesData, fetchPolicy: 'no-cache' });
  });
});
