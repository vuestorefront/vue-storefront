import { useBillingFactory } from '../../src/factories';

const factoryParams = {
  load: jest.fn(() => null),
  save: jest.fn()
};

const useBilling = useBillingFactory(factoryParams);
const useBillingMethods = useBilling();

describe('[CORE - factories] useBillingFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('initial setup', () => {
    it('should have proper initial properties', () => {
      const useBilling = useBillingFactory(factoryParams);
      const { loading, billing, error } = useBilling();

      expect(billing.value).toEqual(null);
      expect(loading.value).toEqual(false);
      expect(error.value).toMatchObject({});
    });

    it('loading works during save execution', async () => {
      const { loading } = useBillingMethods;
      let resolver = null;
      factoryParams.save.mockReturnValueOnce(new Promise((resolve) => {
        resolver = resolve;
      }));
      useBillingMethods.save({ params: {}, billingDetails: {} });
      expect(loading.value).toBe(true);
      resolver();
      setTimeout(()=>{
        expect(loading.value).toBe(false);
      }, 0);
    });

    it('loading works during load execution', async () => {
      const { loading } = useBillingMethods;
      let resolver = null;
      factoryParams.load.mockReturnValueOnce(new Promise((resolve) => {
        resolver = resolve;
      }));
      useBillingMethods.load();
      expect(loading.value).toBe(true);
      resolver();
      setTimeout(()=>{
        expect(loading.value).toBe(false);
      }, 0);
    });

    it('save method execution clears error', async () => {
      const { error } = useBillingMethods;
      const errorMsg = 'errorMsg';
      factoryParams.save.mockReturnValueOnce(new Promise((_, reject) => {
        reject(errorMsg);
      }));
      await useBillingMethods.save({ params: {}, billingDetails: {} });
      expect(error.value.save).toBe(errorMsg);
      await useBillingMethods.save({ params: {}, billingDetails: {} });
      expect(error.value.save).toBe(null);
    });

    it('load method execution clears error', async () => {
      const { error } = useBillingMethods;
      const errorMsg = 'errorMsg';
      factoryParams.load.mockReturnValueOnce(new Promise((_, reject) => {
        reject(errorMsg);
      }));
      await useBillingMethods.load();
      expect(error.value.load).toBe(errorMsg);
      await useBillingMethods.load();
      expect(error.value.load).toBe(null);
    });

    it('load method sets billing info', async () => {
      const billingInfo = { name: 'Test'};
      factoryParams.load.mockReturnValueOnce(billingInfo);
      await useBillingMethods.load();
      expect(useBillingMethods.billing.value).toEqual(billingInfo);
    });

    it('load method supports custom query', async () => {
      const billingInfo = { name: 'Test'};
      const customQuery = 123;
      factoryParams.load.mockReturnValueOnce(billingInfo);
      await useBillingMethods.load({ customQuery: customQuery as any });
      expect((factoryParams.load.mock.calls[0] as any)[1]).toMatchObject({ customQuery });
      expect(useBillingMethods.billing.value).toEqual(billingInfo);
    });

    it('save method sets billing info', async () => {
      const billingInfo = { name: 'Test'};
      factoryParams.save.mockReturnValueOnce(billingInfo);
      await useBillingMethods.save({ params: {}, billingDetails: {} });
      expect(useBillingMethods.billing.value).toEqual(billingInfo);
    });
  });
});
