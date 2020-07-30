import { useCategoryFactory, UseCategoryFactoryParams } from '../../src/factories';
import { UseCategory } from '../../src/types';

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
      const { loading, categories } = useCategory();

      expect(categories.value).toEqual([]);
      expect(loading.value).toEqual(false);
    });
  });

  describe('methods', () => {
    describe('search', () => {
      it('should invoke search', async () => {
        const { categories, search } = useCategory();
        expect(categories.value).toEqual([]);
        await search({ someparam: 'qwerty' });
        expect(params.categorySearch).toBeCalledWith({ someparam: 'qwerty' });
        expect(categories.value).toEqual({ id: 'mocked_removed_cart' });
      });
    });
  });
});
