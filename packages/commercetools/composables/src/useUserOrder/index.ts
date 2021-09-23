import { useUserOrderFactory, UseUserOrderFactoryParams, Context } from '@vue-storefront/core';
import { OrderQueryResult } from '../types/GraphQL';
import { OrderSearchParams } from '../types';

/**
 * @remarks References:
 * {@link OrderQueryResult}, {@link OrderSearchParams}
 */
const useUserOrderFactoryParams: UseUserOrderFactoryParams<OrderQueryResult, OrderSearchParams> = {
  searchOrders: async (context: Context, { customQuery, ...searchParams } = {}): Promise<OrderQueryResult> => {
    const result = await context.$ct.api.getOrders(searchParams, customQuery);
    const orders = result.data?.me.orders || { results: [], total: 0, offset: 0, count: 0 };
    return orders;
  }
};

/**
 * @remarks References:
 * {@link OrderQueryResult}, {@link OrderSearchParams}
 */
const useUserOrder = useUserOrderFactory<OrderQueryResult, OrderSearchParams>(useUserOrderFactoryParams);

export {
  useUserOrder,
  useUserOrderFactoryParams
};
