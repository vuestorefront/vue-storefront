import { useCategoryFactory, UseCategoryFactoryParams } from '../../src/factories';
import { UseCategory } from '../../src/types';

let useCategory: (cacheId?: string) => UseCategory<any, any>;
let params: UseCategoryFactoryParams<any, any>;

const factoryParams = {
  categorySearch: jest.fn()
};

const useCategoryMock = useCategoryFactory(factoryParams);

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
        expect(params.categorySearch).toBeCalledWith({ context: null }, { someparam: 'qwerty' });
        expect(categories.value).toEqual({ id: 'mocked_removed_cart' });
      });

      it('should set error if factory method throwed', async () => {
        const err = new Error('zxczxcx');
        factoryParams.categorySearch.mockImplementationOnce(() => {
          throw err;
        });
        const { search, error } = useCategoryMock('a');

        await search({ someparam: 'qwerty' });

        expect(error.value.search).toBe(err);
      });
    });
  });
});
