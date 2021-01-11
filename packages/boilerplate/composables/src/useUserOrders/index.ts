/* istanbul ignore file */

import {
  Context,
  useUserOrdersFactory,
  UseUserOrdersFactoryParams
} from '@vue-storefront/core';
import { OrdersResponse, OrderSearchParams } from '../types';

const params: UseUserOrdersFactoryParams<OrdersResponse, OrderSearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params: OrderSearchParams): Promise<OrdersResponse> => {
    console.log('Mocked: searchOrders');

    return {
      data: [],
      total: 0
    };
  }
};

export default useUserOrdersFactory<OrdersResponse, OrderSearchParams>(params);
