import { useUserBillingFactory } from '../../src/factories';

const factoryParams = {
  addAddress: jest.fn(() => null),
  deleteAddress: jest.fn(),
  updateAddress: jest.fn(),
  load: jest.fn(),
  setDefaultAddress: jest.fn()
};

const useUserBilling = useUserBillingFactory(factoryParams);
const useUserBillingMethods = useUserBilling();

describe('[CORE - factories] useUserBillingFactory', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should have proper initial properties', () => {
    const useUserBilling = useUserBillingFactory(factoryParams);
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
        await useUserBillingMethods.addAddress({ address: paramsToUpdate });
        expect(useUserBillingMethods.billing.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        const err = new Error('zxczxcx');
        factoryParams.addAddress.mockImplementationOnce(() => {
          throw err;
        });
        await useUserBillingMethods.addAddress('' as any);
        expect(useUserBillingMethods.error.value.addAddress).toBe(err);
      });

      it('finally loading go to false', () => {
        expect(useUserBillingMethods.loading.value).toBe(false);
      });
    });

    describe('deleteAddress', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.deleteAddress.mockReturnValueOnce(paramsToUpdate);
        await useUserBillingMethods.deleteAddress({ address: paramsToUpdate });
        expect(useUserBillingMethods.billing.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        const err = new Error('87878dfdf');
        factoryParams.deleteAddress.mockImplementationOnce(() => {
          throw err;
        });
        await useUserBillingMethods.deleteAddress('' as any);
        expect(useUserBillingMethods.error.value.deleteAddress).toBe(err);
      });

      it('finally loading go to false', () => {
        expect(useUserBillingMethods.loading.value).toBe(false);
      });
    });

    describe('updateAddress', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.updateAddress.mockReturnValueOnce(paramsToUpdate);
        await useUserBillingMethods.updateAddress({ address: paramsToUpdate });
        expect(useUserBillingMethods.billing.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        const err = new Error('23232323');
        factoryParams.updateAddress.mockImplementationOnce(() => {
          throw err;
        });
        await useUserBillingMethods.updateAddress('' as any);
        expect(useUserBillingMethods.error.value.updateAddress).toBe(err);
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
        const err = new Error('cvcvc');
        factoryParams.load.mockImplementationOnce(() => {
          throw err;
        });
        await useUserBillingMethods.load();
        expect(useUserBillingMethods.error.value.load).toBe(err);
      });

      it('finally loading go to false', () => {
        expect(useUserBillingMethods.loading.value).toBe(false);
      });
    });

    describe('setDefaultAddress', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.setDefaultAddress.mockReturnValueOnce(paramsToUpdate);
        await useUserBillingMethods.setDefaultAddress({ address: paramsToUpdate });
        expect(useUserBillingMethods.billing.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        const err = new Error('adsd');
        factoryParams.setDefaultAddress.mockImplementationOnce(() => {
          throw err;
        });
        await useUserBillingMethods.setDefaultAddress('' as any);
        expect(useUserBillingMethods.error.value.setDefaultAddress).toBe(err);
      });

      it('finally loading go to false', () => {
        expect(useUserBillingMethods.loading.value).toBe(false);
      });
    });
  });
});
