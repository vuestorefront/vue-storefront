import { useCart } from '../useCart';
import { Order } from '@vue-storefront/commercetools-api';
import { UseMakeOrder, useMakeOrderFactory, Context } from '@vue-storefront/core';

/**
 * @remarks References:
 * {@link @vue-storefront/commercetools-api#Order}
 */
const useMakeOrderFactoryParams = {
  provide() {
    return {
      cart: useCart()
    };
  },

  make: async (context: Context, { customQuery }): Promise<Order> => {
    const { id, version } = context.cart.cart.value;
    const response = await context.$ct.api.createMyOrderFromCart({ id, version }, customQuery);
    return response.data.order;
  }
};

/**
 * @remarks References:
 * {@link @vue-storefront/commercetools-api#Order}
 */
const useMakeOrder: () => UseMakeOrder<Order> = useMakeOrderFactory<Order>(useMakeOrderFactoryParams);

export {
  useMakeOrder,
  useMakeOrderFactoryParams
};
