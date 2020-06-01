/* istanbul ignore file */

import { useUserOrdersFactory, UseUserOrdersFactoryParams, OrdersSearchResult } from '@vue-storefront/core';
import { Order, OrderSearchParams } from '../../types';

// @todo userOrders

const params: UseUserOrdersFactoryParams<Order, OrderSearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (params: OrderSearchParams = {}): Promise<OrdersSearchResult<Order>> => new Promise(() => ({}))
};

const useUserOrders: () => any = useUserOrdersFactory<Order, OrderSearchParams>(params);

export default useUserOrders;
