/* istanbul ignore file */

import { useUserOrdersFactory, UseUserOrdersFactoryParams, Context } from '@vue-storefront/core';
import { Order, OrderSearchParams } from '../../types';
// @todo userOrders

const params: UseUserOrdersFactoryParams<Order, OrderSearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params: OrderSearchParams = {}): Promise<any> => {
    const result =  await context.$vc.api.getMyOrders(context, params);
    console.log(result);
    return {
      data: result.data.items,
      total: result.total
    };
  }
};

export default useUserOrdersFactory<any, OrderSearchParams>(params);
