/* istanbul ignore file */

import {
  Context,
  useUserOrdersFactory,
  UseUserOrdersFactoryParams,
  OrdersSearchResult
} from '@vue-storefront/core';
import { Order, OrderSearchParams } from '../types';

// @todo userOrders

const params: UseUserOrdersFactoryParams<Order, OrderSearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params: OrderSearchParams = {}): Promise<OrdersSearchResult<Order>> => {
    console.log('Mocked: searchOrders');

    return {
      data: [],
      total: 0
    };
  }
};

const useUserOrders: () => any = useUserOrdersFactory<Order, OrderSearchParams>(params);

export default useUserOrders;
