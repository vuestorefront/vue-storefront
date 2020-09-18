import { CustomQuery, OrdersSearchResult, useUserOrdersFactory, UseUserOrdersFactoryParams } from '@vue-storefront/core';
import { Order } from '../types/GraphQL';
import { OrderSearchParams } from '../types';
import { getOrders } from '@vue-storefront/commercetools-api';

const params: UseUserOrdersFactoryParams<Order, OrderSearchParams> = {
  searchOrders: async (params: OrderSearchParams = {}, customQuery?: CustomQuery): Promise<OrdersSearchResult<Order>> => {
    const result = await getOrders(params, customQuery);
    const { results: data, total } = result.data?.me.orders || { results: [], total: 0 };
    return { data, total };
  }
};

export default useUserOrdersFactory<Order, OrderSearchParams>(params);
