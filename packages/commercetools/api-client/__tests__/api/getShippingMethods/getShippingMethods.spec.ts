import getShippingMethods from '../../../src/api/getShippingMethods';
import { apolloClient } from '../../../src/index';
import defaultQuery from '../../../src/api/getShippingMethods/defaultQuery';

describe('[commercetools-api-client] getShippingMethods', () => {
  it('fetches shipping methods', async () => {
    (apolloClient.query as any).mockImplementation(({ query }) => {
      expect(query).toEqual(defaultQuery);

      return { data: 'shipping response' };
    });

    const { data } = await getShippingMethods();

    expect(data).toBe('shipping response');
  });
});
