import { useCategoryFactory, UseCategoryFactoryParams } from '../src';
import { UseCategory } from '@vue-storefront/interfaces';

// mock persisted state
import * as vsfUtils from '@vue-storefront/utils';
jest.mock('@vue-storefront/utils');
const mockedUtils = vsfUtils as jest.Mocked<typeof vsfUtils>;

let useCategory: (cacheId?: string) => UseCategory<any>;
let params: UseCategoryFactoryParams<any, any>;

function createComposable() {
  params = {
    categorySearch: jest
      .fn()
      .mockResolvedValueOnce({ id: 'mocked_removed_cart' })
  };
  useCategory = useCategoryFactory<any, any>(params);
}

describe('[CORE - factories] useCategoryFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    createComposable();
  });

  describe('initial setup', () => {
    it('should have proper initial properties when no persisted state set', () => {
      mockedUtils.usePersistedState.mockReturnValueOnce({
        state: null,
        persistedResource: jest.fn()
      });
      const { loading, categories } = useCategory();

      expect(categories.value).toEqual([]);
      expect(loading.value).toEqual(false);
    });
  });

  describe('computes', () => {
    describe('categories', () => {
      it('should return categories from state', () => {
        mockedUtils.usePersistedState.mockReturnValueOnce({
          state: [{ id: 'mockedCategory' }],
          persistedResource: jest.fn()
        });
        const { categories } = useCategory();
        expect(categories.value).toEqual([{ id: 'mockedCategory' }]);
      });
    });
  });

  describe('methods', () => {
    describe('search', () => {
      const persistedResource = jest.fn();
      beforeEach(() => {
        mockedUtils.usePersistedState.mockReturnValueOnce({
          state: null,
          persistedResource
        });
      });

      it('should invoke persistedResource on search', async () => {
        persistedResource.mockResolvedValueOnce([
          { categoryId: 'mockedCategory' }
        ]);
        const { categories, search } = useCategory();
        await search({ someparam: 'qwerty' });
        expect(persistedResource).toBeCalledWith(params.categorySearch, {
          someparam: 'qwerty'
        });
        expect(categories.value).toEqual([{ categoryId: 'mockedCategory' }]);
      });
    });
  });
});
