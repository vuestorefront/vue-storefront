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
    // TODO fix type in @vue-storefront/core after update apollo-client
    const response: any = await context.$ct.api.createMyOrderFromCart({ id, version }, customQuery);
    if (response.graphQLErrors) {
      throw response.graphQLErrors[0];
    }
    if (response.networkError) {
      throw response.networkError;
    }
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
