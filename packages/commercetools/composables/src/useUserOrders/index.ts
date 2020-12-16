import { CustomQuery, useUserOrdersFactory, UseUserOrdersFactoryParams, Context } from '@vue-storefront/core';
import { Order } from '../types/GraphQL';
import { OrderSearchParams } from '../types';

const params: UseUserOrdersFactoryParams<Order[], OrderSearchParams> = {
  searchOrders: async (context: Context, params: OrderSearchParams = {}, customQuery?: CustomQuery): Promise<Order[]> => {
    const result = await context.$ct.api.getOrders(params, customQuery);
    const { results } = result.data?.me.orders || { results: [], total: 0 };

    return results;
  }
};

export default useUserOrdersFactory<Order[], OrderSearchParams>(params);
