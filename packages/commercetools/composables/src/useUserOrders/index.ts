import { useUserOrdersFactory, UseUserOrdersFactoryParams } from '@vue-storefront/core';
import { Order } from '../types/GraphQL';
import { OrderSearchParams } from '../types';
import { getMyOrders } from '@vue-storefront/commercetools-api';
import { SearchResult } from '@vue-storefront/core';

const params: UseUserOrdersFactoryParams<Order, OrderSearchParams> = {
  searchOrders: async (params: OrderSearchParams = {}): Promise<SearchResult<Order>> => {
    const result = await getMyOrders(params);
    const { results: data, total } = result.data?.me.orders || { results: [], total: 0 };
    return { data, total };
  }
};

export default useUserOrdersFactory<Order, OrderSearchParams>(params);
