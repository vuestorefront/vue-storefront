import {
  Context,
  useMakeOrderFactory,
  UseMakeOrderFactoryParams
} from '@vue-storefront/core';
import type { Order } from '@vue-storefront/boilerplate-api';

const factoryParams: UseMakeOrderFactoryParams<Order> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  make: async (context: Context, { customQuery }) => {
    console.log('Mocked: useMakeOrder.make');
    return {};
  }
};

export const useMakeOrder = useMakeOrderFactory<Order>(factoryParams);
