import { useShippingFactory } from '../../src/factories';

const factoryParams = {
  load: jest.fn(() => null),
  save: jest.fn()
};

const useShipping = useShippingFactory(factoryParams);
const useShippingMethods = useShipping();

describe('[CORE - factories] useShippingFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('initial setup', () => {
    it('should have proper initial properties', () => {
      const useShipping = useShippingFactory(factoryParams);
      const { loading, shipping, error } = useShipping();

      expect(shipping.value).toEqual(null);
      expect(loading.value).toEqual(false);
      expect(error.value).toMatchObject({});
    });

    it('loading works during save execution', async () => {
      const { loading } = useShippingMethods;
      let resolver = null;
      factoryParams.save.mockReturnValueOnce(new Promise((resolve) => {
        resolver = resolve;
      }));
      useShippingMethods.save({ params: {}, shippingDetails: {} });
      expect(loading.value).toBe(true);
      resolver();
      setTimeout(()=>{
        expect(loading.value).toBe(false);
      }, 0);
    });

    it('loading works during load execution', async () => {
      const { loading } = useShippingMethods;
      let resolver = null;
      factoryParams.load.mockReturnValueOnce(new Promise((resolve) => {
        resolver = resolve;
      }));
      useShippingMethods.load();
      expect(loading.value).toBe(true);
      resolver();
      setTimeout(()=>{
        expect(loading.value).toBe(false);
      }, 0);
    });

    it('save method execution clears error', async () => {
      const { error } = useShippingMethods;
      const errorMsg = 'errorMsg';
      factoryParams.save.mockReturnValueOnce(new Promise((_, reject) => {
        reject(errorMsg);
      }));
      await useShippingMethods.save({ params: {}, shippingDetails: {} });
      expect(error.value.save).toBe(errorMsg);
      await useShippingMethods.save({ params: {}, shippingDetails: {} });
      expect(error.value.save).toBe(null);
    });

    it('load method execution clears error', async () => {
      const { error } = useShippingMethods;
      const errorMsg = 'errorMsg';
      factoryParams.load.mockReturnValueOnce(new Promise((_, reject) => {
        reject(errorMsg);
      }));
      await useShippingMethods.load();
      expect(error.value.load).toBe(errorMsg);
      await useShippingMethods.load();
      expect(error.value.load).toBe(null);
    });

    it('load method sets shipping info', async () => {
      const shippingInfo = { name: 'Test'};
      factoryParams.load.mockReturnValueOnce(shippingInfo);
      await useShippingMethods.load();
      expect(useShippingMethods.shipping.value).toEqual(shippingInfo);
    });

    it('save method sets shipping info', async () => {
      const shippingInfo = { name: 'Test'};
      factoryParams.save.mockReturnValueOnce(shippingInfo);
      await useShippingMethods.save({ params: {}, shippingDetails: {} });
      expect(useShippingMethods.shipping.value).toEqual(shippingInfo);
    });
  });
});
