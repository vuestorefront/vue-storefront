import { useStoreFactory } from '../../src/factories';

const factoryParams = {
  load: jest.fn(),
  change: jest.fn()
};

const useStore = useStoreFactory<any, any>(factoryParams);
const useStoreMethods = useStore();

describe('[CORE - factories] useStoreFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial setup', () => {

    it('should have proper initial properties', () => {
      const useUser = useStoreFactory(factoryParams);
      const { response, loading, error } = useUser();

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
        const store = {key: 'store'};
        factoryParams.change.mockResolvedValue(store);
        await useStoreMethods.change({});
        expect(useStoreMethods.response.value).toEqual(store);
      });

      it('should assign error on fail', async () => {
        const error = {key: 'change'};
        factoryParams.change.mockRejectedValue(error);
        await useStoreMethods.change({});
        expect(useStoreMethods.error.value.change).toEqual(error);
      });

      it('should be called with correct arguments', async () => {
        const store = {key: 'store'};
        factoryParams.change.mockResolvedValue(store);

        await useStoreMethods.change({key: 'test'});
        expect(factoryParams.change).toHaveBeenNthCalledWith(1, {
          current: {key: 'store'},
          next: {key: 'test'},
          customQuery: undefined
        });

        await useStoreMethods.change({key: 'test', customQuery: {key: 'customQuery'}});
        expect(factoryParams.change).toHaveBeenNthCalledWith(2, {
          current: {key: 'store'},
          next: {key: 'test'},
          customQuery: {key: 'customQuery'}
        });
      });

    });

  });
});
