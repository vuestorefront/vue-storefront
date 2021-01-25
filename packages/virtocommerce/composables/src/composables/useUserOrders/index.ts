/* istanbul ignore file */

import { useUserOrdersFactory, UseUserOrdersFactoryParams, OrdersSearchResult, Context } from '@vue-storefront/core';
import { Order, OrderSearchParams } from '../../types';
// @todo userOrders

const params: UseUserOrdersFactoryParams<Order, OrderSearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params: OrderSearchParams = {}): Promise<OrdersSearchResult<any>> => {
    const result =  await context.$vc.api.getMyOrders(context, params);
    console.log(result);
    return {
      data: result.data.items,
      total: result.total
    };
  }
};

const useUserOrders: () => any = useUserOrdersFactory<any, OrderSearchParams>(params);
export default useUserOrders;
