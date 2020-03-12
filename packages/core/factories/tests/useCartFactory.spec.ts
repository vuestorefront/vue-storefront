/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import mountComposable from './_mountComposable';
import { useCartFactory} from '../src/useCartFactory';
import { ref, Ref } from '@vue/composition-api';

let useCart;
let params;
function createComposable () {
  const cart: Ref<any> = ref(null);

  params = {
    cart,
    loadCart: async () => {
      return Promise.resolve('cartLoaded');
    },
    addToCart: async (currentCart: any, product: any, quantity: any) => {
      return Promise.resolve('addedToCart');
    },
    removeFromCart: async (currentCart: any, product: any) => {
      return Promise.resolve('removedFromCart');
    },
    updateQuantity: async (currentCart: any, product: any, quantity: number) => {
      return Promise.resolve('updatedQty');
    },
    clearCart: async (currentCart: any) => {
      return Promise.resolve('cartCleared');
    },
    applyCoupon: async (currentCart: any, coupon: string) => {
      return Promise.resolve({ cart: currentCart, coupon: 'couponApplied' });
    },
    removeCoupon: async (currentCart: any) => {
      return Promise.resolve({ cart: currentCart, coupon: 'couponRemoved' });
    },
    isOnCart: (currentCart: any) => {
      return true;
    }
  };
  useCart = useCartFactory<any, any, any, any>(params);
}

describe('[commercetools-composables] useCart', () => {
  beforeEach(() => {
    createComposable();
  });

  it('creates properties', () => {
    const { cart, coupon, loading } = useCart();

    expect(cart.value).toEqual(null);
    expect(coupon.value).toEqual(null);
    expect(loading.value).toEqual(false);
  });

  it('loads cart', async () => {
    const wrapper = mountComposable(useCart);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.loading).toBeFalsy();
    expect(wrapper.vm.$data.cart).toEqual(('cartLoaded'));
  });

  it('refreshes cart', async () => {
    const wrapper = mountComposable(useCart);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.$data.addToCart();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.loading).toBeTruthy();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.$data.refreshCart();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.loading).toBeFalsy();
    expect(wrapper.vm.$data.cart).toEqual(('cartLoaded'));
  });

  it('adds product to the cart', async () => {
    const wrapper = mountComposable(useCart);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.$data.addToCart();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.loading).toBeTruthy();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.loading).toBeFalsy();
    expect(wrapper.vm.$data.cart).toEqual(('addedToCart'));
  });

  it('removes product from the cart', async () => {
    const wrapper = mountComposable(useCart);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.$data.removeFromCart();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.loading).toBeTruthy();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.loading).toBeFalsy();
    expect(wrapper.vm.$data.cart).toEqual(('removedFromCart'));
  });

  it('checks if product is in cart', async () => {
    const wrapper = mountComposable(useCart);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.isOnCart()).toEqual(true);
  });

  it('updates quantity for given product', async () => {
    const wrapper = mountComposable(useCart);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.$data.updateQuantity({}, 2);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.loading).toBeTruthy();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.loading).toBeFalsy();
    expect(wrapper.vm.$data.cart).toEqual('updatedQty');
  });

  it('not updates quantity for given product when it is zero', async () => {
    const wrapper = mountComposable(useCart);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.$data.updateQuantity();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.loading).toBeFalsy();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.cart).toEqual('cartLoaded');
  });

  it('clears entire cart', async () => {
    const wrapper = mountComposable(useCart);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.$data.clearCart();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.loading).toBeTruthy();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.loading).toBeFalsy();
    expect(wrapper.vm.$data.cart).toEqual('cartCleared');
  });

  it.skip('applies coupon', async () => {
    const wrapper = mountComposable(useCart);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    wrapper.vm.$data.applyCoupon();
  });

  it.skip('removes coupon', async () => {
    const wrapper = mountComposable(useCart);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    wrapper.vm.$data.removeCoupon();
  });
});
