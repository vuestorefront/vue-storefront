import { useUserOrderFactory, UseUserOrderFactoryParams, Context } from '@vue-storefront/core';
import { Order } from '../types/GraphQL';
import { OrderSearchParams } from '../types';

const useUserOrderFactoryParams: UseUserOrderFactoryParams<Order[], OrderSearchParams> = {
  searchOrders: async (context: Context, { customQuery, ...searchParams } = {}): Promise<Order[]> => {
    const result = await context.$ct.api.getOrders(searchParams, customQuery);
    const { results: data } = result.data?.me.orders || { results: [], total: 0 };
    return data;
  }
};

const useUserOrder = useUserOrderFactory<Order[], OrderSearchParams>(useUserOrderFactoryParams);

export {
  useUserOrder,
  useUserOrderFactoryParams
};
