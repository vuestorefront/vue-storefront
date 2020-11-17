/* istanbul ignore file */

import { useUserOrdersFactory, UseUserOrdersFactoryParams, OrdersSearchResult } from '@vue-storefront/core';
import { Order, OrderSearchParams } from '../../types';
import { getMyOrders } from '@vue-storefront/virtocommerce-api';
// @todo userOrders

const params: UseUserOrdersFactoryParams<Order, OrderSearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (params: OrderSearchParams = {}): Promise<OrdersSearchResult<any>> => {
    const result =  await getMyOrders(params);
    console.log(result);
    return {
      data: result.data.items,
      total: result.total
    };
  }
};

const useUserOrders: () => any = useUserOrdersFactory<any, OrderSearchParams>(params);
export default useUserOrders;
