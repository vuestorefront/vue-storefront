import { useStoreFactory } from '../../src/factories';

const factoryParams = {
  load: jest.fn(),
  change: jest.fn()
};

const useStore = useStoreFactory<any>(factoryParams);
const useStoreMethods = useStore();

describe('[CORE - factories] useStoreFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial setup', () => {

    it('should have proper initial properties', () => {
      const useUser = useStoreFactory(factoryParams);
      const { store, loading, error } = useUser();

      expect(store.value).toEqual(null);
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
        expect(useStoreMethods.store.value).toEqual(store);
      });

      it('should assign error on fail', async () => {
        const error = {key: 'error'};
        factoryParams.load.mockRejectedValue(error);
        await useStoreMethods.load();
        expect(useStoreMethods.error.value.load).toEqual(error);
      });

    });

    describe('change', () => {

      it('should return store data on success', async () => {
        const store = {key: 'store'};
        factoryParams.change.mockResolvedValue(store);
        await useStoreMethods.change({});
        expect(useStoreMethods.store.value).toEqual(store);
      });

      it('should assign error on fail', async () => {
        const error = {key: 'change'};
        factoryParams.change.mockRejectedValue(error);
        await useStoreMethods.change({});
        expect(useStoreMethods.error.value.change).toEqual(error);
      });

    });

  });
});
