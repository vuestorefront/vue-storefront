import getProduct from '../../../src/api/getProduct';
import { apiClient } from '../../../src/index';

jest.mock('../../../src/index', () => ({
  apiClient: {
    products: {
      query: jest.fn(),
      getByIds: jest.fn()
    },
    masters: {
      getByKey: jest.fn()
    },
    search: {
      suggestions: jest.fn()
    }
  }
}));

describe('[about-you-api-client] getProduct', () => {
  it('fetches product with default query', async () => {
    const searchParams = {};
    const result = [{ id: 1, name: 'shirt' }];

    (apiClient.products.query as any).mockReturnValueOnce({ entities: result });
    const response = await getProduct(searchParams);

    expect(response).toEqual(result);
  });

  it('fetches product by Ids', async () => {
    const searchParams = { ids: [1], with: {} };
    const result = [{ id: 1, name: 'shirt' }];

    (apiClient.products.getByIds as any).mockReturnValueOnce(result);
    const response = await getProduct(searchParams);

    expect(response).toEqual(result);
  });

  it('fetches product with masterKey', async () => {
    const searchParams = { masterKey: '123', with: {} };
    const result = [{ id: 1, name: 'shirt' }];

    (apiClient.masters.getByKey as any).mockReturnValueOnce({ products: result });
    const response = await getProduct(searchParams);

    expect(response).toEqual(result);
  });

  it('fetches product with term', async () => {
    const searchParams = { term: 'shirt' };
    const result = [{ id: 1, name: 'shirt' }];

    (apiClient.search.suggestions as any).mockReturnValueOnce({ products: result });
    const response = await getProduct(searchParams);

    expect(response).toEqual(result);
  });
});
