import { useUserBillingFactory } from '../../src/factories';

const factoryParams = {
  addAddress: jest.fn(() => null),
  deleteAddress: jest.fn(),
  updateAddress: jest.fn(),
  load: jest.fn(),
  setDefaultAddress: jest.fn()
};

const { useUserBilling } = useUserBillingFactory(factoryParams);
const useUserBillingMethods = useUserBilling();

describe('[CORE - factories] useUserBillingFactory', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should have proper initial properties', () => {
    const { useUserBilling } = useUserBillingFactory(factoryParams);
    const {
      billing,
      loading
    } = useUserBilling();

    expect(billing.value).toEqual({});
    expect(loading.value).toEqual(false);
  });

  describe('methods', () => {
    describe('addAddress', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.addAddress.mockReturnValueOnce(paramsToUpdate);
        await useUserBillingMethods.addAddress(paramsToUpdate);
        expect(useUserBillingMethods.billing.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        factoryParams.addAddress.mockImplementationOnce(() => {
          throw new Error;
        });
        await expect(useUserBillingMethods.addAddress('' as any)).rejects.toThrow();
      });

      it('finally loading go to false', () => {
        expect(useUserBillingMethods.loading.value).toBe(false);
      });
    });

    describe('deleteAddress', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.deleteAddress.mockReturnValueOnce(paramsToUpdate);
        await useUserBillingMethods.deleteAddress(paramsToUpdate);
        expect(useUserBillingMethods.billing.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        factoryParams.deleteAddress.mockImplementationOnce(() => {
          throw new Error();
        });
        await expect(useUserBillingMethods.deleteAddress('' as any)).rejects.toThrow();
      });

      it('finally loading go to false', () => {
        expect(useUserBillingMethods.loading.value).toBe(false);
      });
    });

    describe('updateAddress', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.updateAddress.mockReturnValueOnce(paramsToUpdate);
        await useUserBillingMethods.updateAddress(paramsToUpdate);
        expect(useUserBillingMethods.billing.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        factoryParams.updateAddress.mockImplementationOnce(() => {
          throw new Error();
        });
        await expect(useUserBillingMethods.updateAddress('' as any)).rejects.toThrow();
      });

      it('finally loading go to false', () => {
        expect(useUserBillingMethods.loading.value).toBe(false);
      });
    });

    describe('load', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.load.mockReturnValueOnce(paramsToUpdate);
        await useUserBillingMethods.load();
        expect(useUserBillingMethods.billing.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        factoryParams.load.mockImplementationOnce(() => {
          throw new Error();
        });
        await expect(useUserBillingMethods.load()).rejects.toThrow();
      });

      it('finally loading go to false', () => {
        expect(useUserBillingMethods.loading.value).toBe(false);
      });
    });

    describe('setDefaultAddress', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.setDefaultAddress.mockReturnValueOnce(paramsToUpdate);
        await useUserBillingMethods.setDefaultAddress(paramsToUpdate);
        expect(useUserBillingMethods.billing.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        factoryParams.setDefaultAddress.mockImplementationOnce(() => {
          throw new Error();
        });
        await expect(useUserBillingMethods.setDefaultAddress('' as any)).rejects.toThrow();
      });

      it('finally loading go to false', () => {
        expect(useUserBillingMethods.loading.value).toBe(false);
      });
    });
  });
});
