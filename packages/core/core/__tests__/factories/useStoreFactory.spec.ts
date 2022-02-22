import { useStoreFactory } from '../../src/factories';
import { AgnosticStore } from '../../src/types';

const factoryParams = {
  load: jest.fn(),
  change: jest.fn()
};

const stores = {key: 'stores'};
const currentStore = ({store: 1} as unknown) as AgnosticStore;
const store = ({store: 2} as unknown) as AgnosticStore;
const error = {key: 'errors'};

const useStore = useStoreFactory<any>(factoryParams);
const useStoreMethods = useStore();

describe('[CORE - factories] useStoreFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial setup', () => {

    it('should have proper initial properties', () => {
      const useStore = useStoreFactory(factoryParams);
      const { response, loading, error } = useStore();

      expect(response.value).toEqual(null);
      expect(loading.value).toEqual(false);
      expect(error.value).toEqual({load: null, change: null});
    });

  });

  describe('methods', () => {

    describe('load', () => {

      it('should return store data on success', async () => {
        const store = {key: 'store'};
        factoryParams.load.mockResolvedValue(store);
        await useStoreMethods.load();
        expect(useStoreMethods.response.value).toEqual(store);
      });

      it('should assign error on fail', async () => {
        const error = {key: 'error'};
        factoryParams.load.mockRejectedValue(error);
        await useStoreMethods.load();
        expect(useStoreMethods.error.value.load).toEqual(error);
      });

      it('should be called with correct arguments', async () => {
        await useStoreMethods.load();
        expect(factoryParams.load).toHaveBeenNthCalledWith(1, {
          customQuery: undefined
        });

        await useStoreMethods.load({customQuery: {key: 'customQuery'}});
        expect(factoryParams.load).toHaveBeenNthCalledWith(2, {
          customQuery: {key: 'customQuery'}
        });
      });

    });

    describe('change', () => {

      it('should return store data on success', async () => {
        factoryParams.change.mockResolvedValue(stores);
        await useStoreMethods.change({ currentStore, store });
        expect(useStoreMethods.response.value).toEqual(stores);
      });

      it('should assign error on fail', async () => {
        factoryParams.change.mockRejectedValue(error);
        await useStoreMethods.change({ currentStore, store });
        expect(useStoreMethods.error.value.change).toEqual(error);
      });

      it('should be called with correct arguments', async () => {
        factoryParams.change.mockResolvedValue(stores);

        await useStoreMethods.change({currentStore, store});
        expect(factoryParams.change).toHaveBeenNthCalledWith(1, {
          currentStore, store, customQuery: undefined
        });

        await useStoreMethods.change({currentStore, store, customQuery: {key: 'customQuery'}});
        expect(factoryParams.change).toHaveBeenNthCalledWith(2, {
          currentStore, store, customQuery: {key: 'customQuery'}
        });
      });

    });

  });
});
