import { mountMixin } from '@vue-storefront/unit-tests/utils';
import { Product } from '../../../components/Product';

describe('Product', () => {
  let mockMountingOptions;

  beforeEach(() => {
    jest.clearAllMocks();

    mockMountingOptions = {
      propsData: {
        product: {
          image: 'example image',
          sku: 'example sku'
        }
      },
      mocks: {
        $bus: {
          $emit: jest.fn(),
          $on: jest.fn(),
          $off: jest.fn()
        }
      },
      methods: {
        getThumbnail: jest.fn(() => '')
      }
    };
  });

  it('can be initialized', () => {
    const wrapper = mountMixin(Product, mockMountingOptions);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('exposes computed properties', () => {
    const wrapper = mountMixin(Product, mockMountingOptions);

    expect((wrapper.vm as any).thumbnail).toBeDefined();
  });

  describe('hooks', () => {
    it('beforeMount hook should start subscription for cart-after-itemchanged event', () => {
      const wrapper = mountMixin(Product, mockMountingOptions);

      expect(mockMountingOptions.mocks.$bus.$on).toHaveBeenCalledWith('cart-after-itemchanged', (wrapper.vm as any).onProductChanged);
    });

    it('beforeDestroy hook should stop subscription for user-after-itemchanged event', () => {
      const wrapper = mountMixin(Product, mockMountingOptions);

      wrapper.destroy();

      expect(mockMountingOptions.mocks.$bus.$off).toHaveBeenCalledWith('cart-after-itemchanged', (wrapper.vm as any).onProductChanged);
    });
  });

  describe('methods', () => {
    it('onProductChanged method should update component only if product has changed', () => {
      const wrapper = mountMixin(Product, mockMountingOptions);
      const mockForceUpdateFn = jest.spyOn((wrapper.vm as any), '$forceUpdate');

      mockForceUpdateFn.mockClear();
      (wrapper.vm as any).onProductChanged({ item: { sku: 'example sku' } });
      expect(mockForceUpdateFn).toHaveBeenCalled();

      mockForceUpdateFn.mockClear();
      (wrapper.vm as any).onProductChanged({ item: { sku: 'another sku' } });
      expect(mockForceUpdateFn).not.toHaveBeenCalled();
    });
  });
});
