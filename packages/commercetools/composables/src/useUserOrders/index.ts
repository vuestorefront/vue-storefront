import { CustomQuery, OrdersSearchResult, useUserOrdersFactory, UseUserOrdersFactoryParams, Context } from '@vue-storefront/core';
import { Order } from '../types/GraphQL';
import { OrderSearchParams } from '../types';

const params: UseUserOrdersFactoryParams<Order, OrderSearchParams> = {
  searchOrders: async (context: Context, params: OrderSearchParams = {}, customQuery?: CustomQuery): Promise<OrdersSearchResult<Order>> => {
    const result = await context.$ct.api.getOrders(params, customQuery);
    const { results: data, total } = result.data?.me.orders || { results: [], total: 0 };
    return { data, total };
  }
};

export default useUserOrdersFactory<Order, OrderSearchParams>(params);
