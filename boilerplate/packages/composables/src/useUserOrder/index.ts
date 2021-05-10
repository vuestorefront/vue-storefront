/* istanbul ignore file */

import {
  Context,
  useUserOrderFactory,
  UseUserOrderFactoryParams
} from '@vue-storefront/core';
import { OrdersResponse, OrderSearchParams } from '../types';

const params: UseUserOrderFactoryParams<OrdersResponse, OrderSearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params: OrderSearchParams): Promise<OrdersResponse> => {
    console.log('Mocked: searchOrders');

    return {
      data: [],
      total: 0
    };
  }
};

export default useUserOrderFactory<OrdersResponse, OrderSearchParams>(params);
