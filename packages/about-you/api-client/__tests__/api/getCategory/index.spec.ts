import getCategory from '../../../src/api/getCategory';
import { apiClient } from '../../../src/index';

jest.mock('../../../src/index', () => ({
  apiClient: {
    categories: {
      getByPath: jest.fn(),
      getByIds: jest.fn(),
      getRoots: jest.fn()
    }
  }
}));

describe('[about-you-api-client] getCategory', () => {
  it('fetches category with default query', async () => {
    const searchParams = {};
    const result = [{ id: 1, categoryName: 'shoes' }];

    (apiClient.categories.getRoots as any).mockReturnValueOnce(result);
    const response = await getCategory(searchParams);

    expect(response).toEqual(result);
  });

  it('fetches categoy by ids', async () => {
    const searchParams = { ids: [1], depth: 1 };
    const result = [{ id: 1, categoryName: 'shoes' }];

    (apiClient.categories.getByIds as any).mockReturnValueOnce(result);
    const response = await getCategory(searchParams);

    expect(response).toEqual(result);
  });

  it('fetches category with path', async () => {
    const searchParams = { path: [''], with: {} };
    const result = [{ id: 1, categoryName: 'shoes' }];

    (apiClient.categories.getByPath as any).mockReturnValueOnce({ id: 1, categoryName: 'shoes' });
    const response = await getCategory(searchParams);

    expect(response).toEqual(result);
  });
});
