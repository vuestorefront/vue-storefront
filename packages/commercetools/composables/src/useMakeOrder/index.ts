import useCart from '../useCart';
import { Order } from './../types/GraphQL';
import { UseMakeOrder, useMakeOrderFactory, Context } from '@vue-storefront/core';

const factoryParams = {
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

const useMakeOrder: () => UseMakeOrder<Order> = useMakeOrderFactory<Order>(factoryParams);

export default useMakeOrder;
