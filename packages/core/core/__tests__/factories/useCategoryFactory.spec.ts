import { useCategoryFactory, UseCategoryFactoryParams } from '../../src/factories';
import { UseCategory } from '../../src/types';
import { isCacheValid } from '../../src/utils';

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
      jest.spyOn(Date, 'now').mockImplementationOnce(() => 1);
      const { loading, categories, cacheTimestamp } = useCategory();

      expect(categories.value).toEqual([]);
      expect(loading.value).toEqual(false);
      expect(cacheTimestamp.value).toEqual(1);
    });
  });

  describe('methods', () => {
    beforeEach(() => {
      (isCacheValid as jest.Mock).mockReturnValue(false);
    });
    describe('search', () => {
      it('should invoke search', async () => {
        const { categories, search } = useCategory();
        expect(categories.value).toEqual([]);
        await search({ someparam: 'qwerty' });
        expect(params.categorySearch).toBeCalledWith({ someparam: 'qwerty' });
        expect(categories.value).toEqual({ id: 'mocked_removed_cart' });
      });

      it('should not invoke content search when isCacheValid returns true', async () => {
        (isCacheValid as jest.Mock).mockReturnValue(true);
        const { search } = useCategory();
        const searchParams = { someparam: 'qwerty' };
        await search(searchParams);
        expect(params.categorySearch).toBeCalledTimes(0);
      });

      it('should invoke content search when isCacheValid returns true and force param is true', async () => {
        (isCacheValid as jest.Mock).mockReturnValue(true);
        const { search } = useCategory();
        const searchParams = { someparam: 'qwerty', force: true };
        await search(searchParams);
        expect(params.categorySearch).toBeCalledTimes(1);
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
