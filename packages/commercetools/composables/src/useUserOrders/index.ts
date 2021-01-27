import { useUserOrdersFactory, UseUserOrdersFactoryParams, Context } from '@vue-storefront/core';
import { Order } from '../types/GraphQL';
import { OrderSearchParams } from '../types';

const params: UseUserOrdersFactoryParams<Order[], OrderSearchParams> = {
  searchOrders: async (context: Context, { customQuery, ...searchParams } = {}): Promise<Order[]> => {
    const result = await context.$ct.api.getOrders(searchParams, customQuery);
    const { results: data } = result.data?.me.orders || { results: [], total: 0 };
    return data;
  }
};

export default useUserOrdersFactory<Order[], OrderSearchParams>(params);
