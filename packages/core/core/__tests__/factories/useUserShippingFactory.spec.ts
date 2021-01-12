import { useUserShippingFactory } from '../../src/factories';

const factoryParams = {
  addAddress: jest.fn(() => null),
  deleteAddress: jest.fn(),
  updateAddress: jest.fn(),
  load: jest.fn(),
  setDefaultAddress: jest.fn()
};

const useUserShipping = useUserShippingFactory(factoryParams);
const useUserShippingMethods = useUserShipping();

describe('[CORE - factories] useUserShippingFactory', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should have proper initial properties', () => {
    const useUserShipping = useUserShippingFactory(factoryParams);
    const {
      shipping,
      loading
    } = useUserShipping();

    expect(shipping.value).toEqual({});
    expect(loading.value).toEqual(false);
  });

  describe('methods', () => {
    describe('addAddress', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.addAddress.mockReturnValueOnce(paramsToUpdate);
        await useUserShippingMethods.addAddress({ address: paramsToUpdate });
        expect(useUserShippingMethods.shipping.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        const err = new Error('2323');
        factoryParams.addAddress.mockImplementationOnce(() => {
          throw err;
        });
        await useUserShippingMethods.addAddress('' as any);
        expect(useUserShippingMethods.error.value.addAddress).toBe(err);
      });

      it('finally loading go to false', () => {
        expect(useUserShippingMethods.loading.value).toBe(false);
      });
    });

    describe('deleteAddress', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.deleteAddress.mockReturnValueOnce(paramsToUpdate);
        await useUserShippingMethods.deleteAddress({ address: paramsToUpdate });
        expect(useUserShippingMethods.shipping.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        const err = new Error('2323');
        factoryParams.deleteAddress.mockImplementationOnce(() => {
          throw err;
        });
        await useUserShippingMethods.deleteAddress('' as any);
        expect(useUserShippingMethods.error.value.deleteAddress).toBe(err);
      });

      it('finally loading go to false', () => {
        expect(useUserShippingMethods.loading.value).toBe(false);
      });
    });

    describe('updateAddress', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.updateAddress.mockReturnValueOnce(paramsToUpdate);
        await useUserShippingMethods.updateAddress({ address: paramsToUpdate });
        expect(useUserShippingMethods.shipping.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        const err = new Error('2323');
        factoryParams.updateAddress.mockImplementationOnce(() => {
          throw err;
        });
        await useUserShippingMethods.updateAddress('' as any);
        expect(useUserShippingMethods.error.value.updateAddress).toBe(err);
      });

      it('finally loading go to false', () => {
        expect(useUserShippingMethods.loading.value).toBe(false);
      });
    });

    describe('load', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.load.mockReturnValueOnce(paramsToUpdate);
        await useUserShippingMethods.load();
        expect(useUserShippingMethods.shipping.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        const err = new Error('2323');
        factoryParams.load.mockImplementationOnce(() => {
          throw err;
        });
        await useUserShippingMethods.load();
        expect(useUserShippingMethods.error.value.load).toBe(err);
      });

      it('finally loading go to false', () => {
        expect(useUserShippingMethods.loading.value).toBe(false);
      });
    });

    describe('setDefaultAddress', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.setDefaultAddress.mockReturnValueOnce(paramsToUpdate);
        await useUserShippingMethods.setDefaultAddress({ address: paramsToUpdate });
        expect(useUserShippingMethods.shipping.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        const err = new Error('zxczxcx');
        factoryParams.setDefaultAddress.mockImplementationOnce(() => {
          throw err;
        });
        await useUserShippingMethods.setDefaultAddress('' as any);
        expect(useUserShippingMethods.error.value.setDefaultAddress).toBe(err);
      });

      it('finally loading go to false', () => {
        expect(useUserShippingMethods.loading.value).toBe(false);
      });
    });
  });
});
