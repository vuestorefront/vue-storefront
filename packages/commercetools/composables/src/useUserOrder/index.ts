import { useUserOrderFactory, UseUserOrderFactoryParams, Context } from '@vue-storefront/core';
import { OrderSearchParams, Orders } from '../types';

const useUserOrderFactoryParams: UseUserOrderFactoryParams<Orders, OrderSearchParams> = {
  searchOrders: async (context: Context, { customQuery, ...searchParams } = {}): Promise<Orders> => {
    const result = await context.$ct.api.getOrders(searchParams, customQuery);
    const { results, total, offset, count } = result.data?.me.orders || { results: [], total: 0, offset: 0, count: 0 };
    return { results, total, offset, count };
  }
};

const useUserOrder = useUserOrderFactory<Orders, OrderSearchParams>(useUserOrderFactoryParams);

export {
  useUserOrder,
  useUserOrderFactoryParams
};
