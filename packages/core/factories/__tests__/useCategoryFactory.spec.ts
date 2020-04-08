import { useCategoryFactory, UseCategoryFactoryParams } from '../src';
import { UseCategory } from '@vue-storefront/interfaces';
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
      mockedUtils.useSSR.mockReturnValueOnce({
        initialState: null,
        saveToInitialState: jest.fn()
      });
      const { loading, categories } = useCategory();

      expect(categories.value).toEqual([]);
      expect(loading.value).toEqual(false);
    });
  });

  describe('computes', () => {
    describe('categories', () => {
      it('should return categories from state', () => {
        mockedUtils.useSSR.mockReturnValueOnce({
          initialState: [{ id: 'mockedCategory' }],
          saveToInitialState: jest.fn()
        });
        const { categories } = useCategory();
        expect(categories.value).toEqual([{ id: 'mockedCategory' }]);
      });
    });
  });

  describe('methods', () => {
    describe('search', () => {
      it('should invoke persistedResource on search', async () => {
        mockedUtils.useSSR.mockReturnValueOnce({
          initialState: null,
          saveToInitialState: jest.fn()
        });
        const { categories, search } = useCategory();
        expect(categories.value).toEqual([]);
        await search({ someparam: 'qwerty' });
        expect(params.categorySearch).toBeCalledWith({ someparam: 'qwerty' });
        expect(categories.value).toEqual({ id: 'mocked_removed_cart' });
      });

      it('should invoke persistedResource on search with ssr', async () => {
        mockedUtils.useSSR.mockReturnValueOnce({
          initialState: [{ id: 'category-ssr' }],
          saveToInitialState: jest.fn()
        });
        const { categories, search } = useCategory();
        expect(categories.value).toEqual([{ id: 'category-ssr' }]);
        await search({ someparam: 'qwerty' });
        expect(params.categorySearch).toBeCalledWith({ someparam: 'qwerty' });
        expect(categories.value).toEqual({ id: 'mocked_removed_cart' });
      });
    });
  });
});
