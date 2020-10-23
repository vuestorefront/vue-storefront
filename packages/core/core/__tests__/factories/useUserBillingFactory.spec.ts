import { useUserBillingFactory } from '../../src/factories';

const factoryParams = {
  addAddress: jest.fn(() => null),
  deleteAddress: jest.fn(),
  updateAddress: jest.fn(),
  load: jest.fn(),
  setDefault: jest.fn()
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
          throw 'Error';
        });
        await expect(useUserBillingMethods.addAddress('' as any)).rejects.toThrow('Error');
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
          throw 'Error';
        });
        await expect(useUserBillingMethods.deleteAddress('' as any)).rejects.toThrow('Error');
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
          throw 'Error';
        });
        await expect(useUserBillingMethods.updateAddress('' as any)).rejects.toThrow('Error');
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
          throw 'Error';
        });
        await expect(useUserBillingMethods.load()).rejects.toThrow('Error');
      });

      it('finally loading go to false', () => {
        expect(useUserBillingMethods.loading.value).toBe(false);
      });
    });

    describe('setDefault', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.setDefault.mockReturnValueOnce(paramsToUpdate);
        await useUserBillingMethods.setDefault(paramsToUpdate);
        expect(useUserBillingMethods.billing.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        factoryParams.setDefault.mockImplementationOnce(() => {
          throw 'Error';
        });
        await expect(useUserBillingMethods.setDefault('' as any)).rejects.toThrow('Error');
      });

      it('finally loading go to false', () => {
        expect(useUserBillingMethods.loading.value).toBe(false);
      });
    });
  });
});
