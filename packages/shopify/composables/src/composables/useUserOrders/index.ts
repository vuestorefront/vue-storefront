/* istanbul ignore file */

import { useUserOrdersFactory, UseUserOrdersFactoryParams, OrdersSearchResult } from '@vue-storefront/core';
import { Order, OrderSearchParams } from '../../types';
import { getCustomer } from '@vue-storefront/shopify-api';
import Cookies from 'js-cookie';

// @todo userOrders

const params: UseUserOrdersFactoryParams<Order, OrderSearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (params: OrderSearchParams = {}): Promise<OrdersSearchResult<Order>> => {
    const token = Cookies.get('token');
    const result: any = await getCustomer.fetchOrders(token);
    const orders = {data: [], total: 0};

    if (result) {
      orders.data = result.customer.orders;
      orders.total = result.customer.orders.length;
      return orders;
    }

    return orders;
  }
};

const useUserOrders: () => any = useUserOrdersFactory<Order, OrderSearchParams>(params);

export default useUserOrders;
