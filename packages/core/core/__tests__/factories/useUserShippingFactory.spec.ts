import { useUserShippingFactory } from '../../src/factories';

const factoryParams = {
  addAddress: jest.fn(() => null),
  deleteAddress: jest.fn(),
  updateAddress: jest.fn(),
  load: jest.fn(),
  setDefault: jest.fn()
};

const { useUserShipping } = useUserShippingFactory(factoryParams);
const useUserShippingMethods = useUserShipping();

describe('[CORE - factories] useUserShippingFactory', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should have proper initial properties', () => {
    const { useUserShipping } = useUserShippingFactory(factoryParams);
    const {
      addresses,
      totalAddresses,
      defaultAddress,
      loading
    } = useUserShipping();

    expect(addresses.value).toEqual([]);
    expect(totalAddresses.value).toEqual(0);
    expect(defaultAddress.value).toEqual(null);
    expect(loading.value).toEqual(false);
  });

  describe('methods', () => {
    describe('addAddress', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.addAddress.mockReturnValueOnce(paramsToUpdate);
        await useUserShippingMethods.addAddress(paramsToUpdate);
        expect(useUserShippingMethods.addresses.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        factoryParams.addAddress.mockImplementationOnce(() => {
          throw 'Error';
        });
        await expect(useUserShippingMethods.addAddress('' as any)).rejects.toThrow('Error');
      });

      it('finally loading go to false', () => {
        expect(useUserShippingMethods.loading.value).toBe(false);
      });
    });

    describe('deleteAddress', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.deleteAddress.mockReturnValueOnce(paramsToUpdate);
        await useUserShippingMethods.deleteAddress(paramsToUpdate);
        expect(useUserShippingMethods.addresses.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        factoryParams.deleteAddress.mockImplementationOnce(() => {
          throw 'Error';
        });
        await expect(useUserShippingMethods.deleteAddress('' as any)).rejects.toThrow('Error');
      });

      it('finally loading go to false', () => {
        expect(useUserShippingMethods.loading.value).toBe(false);
      });
    });

    describe('updateAddress', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.updateAddress.mockReturnValueOnce(paramsToUpdate);
        await useUserShippingMethods.updateAddress(paramsToUpdate);
        expect(useUserShippingMethods.addresses.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        factoryParams.updateAddress.mockImplementationOnce(() => {
          throw 'Error';
        });
        await expect(useUserShippingMethods.updateAddress('' as any)).rejects.toThrow('Error');
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
        expect(useUserShippingMethods.addresses.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        factoryParams.load.mockImplementationOnce(() => {
          throw 'Error';
        });
        await expect(useUserShippingMethods.load()).rejects.toThrow('Error');
      });

      it('finally loading go to false', () => {
        expect(useUserShippingMethods.loading.value).toBe(false);
      });
    });

    describe('setDefault', () => {
      it('updates addresses', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.setDefault.mockReturnValueOnce(paramsToUpdate);
        await useUserShippingMethods.setDefault(paramsToUpdate);
        expect(useUserShippingMethods.defaultAddress.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        factoryParams.setDefault.mockImplementationOnce(() => {
          throw 'Error';
        });
        await expect(useUserShippingMethods.setDefault('' as any)).rejects.toThrow('Error');
      });

      it('finally loading go to false', () => {
        expect(useUserShippingMethods.loading.value).toBe(false);
      });
    });
  });
});
