import { useUserOrderFactory, UseUserOrderFactoryParams, Context } from '@vue-storefront/core';
import { OrderQueryResult } from '@vue-storefront/commercetools-api';
import { OrderSearchParams } from '../types';

const useUserOrderFactoryParams: UseUserOrderFactoryParams<OrderQueryResult, OrderSearchParams> = {
  searchOrders: async (context: Context, { customQuery, ...searchParams } = {}): Promise<OrderQueryResult> => {
    const result = await context.$ct.api.getOrders(searchParams, customQuery);
    const orders = result.data?.me.orders || { results: [], total: 0, offset: 0, count: 0, exists: false };
    return orders;
  }
};

const useUserOrder = useUserOrderFactory<OrderQueryResult, OrderSearchParams>(useUserOrderFactoryParams);

export {
  useUserOrder,
  useUserOrderFactoryParams
};
