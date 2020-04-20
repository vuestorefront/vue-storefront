/* istanbul ignore file */

import { useUserOrdersFactory, UseUserOrdersFactoryParams, OrdersSearchResult } from '@vue-storefront/core';
import { BapiOrder, BapiOrderSearchParams } from '../../types';

// @todo userOrders

const params: UseUserOrdersFactoryParams<BapiOrder, BapiOrderSearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (params: BapiOrderSearchParams = {}): Promise<OrdersSearchResult<BapiOrder>> => new Promise(() => ({}))
};

const useUserOrders: () => any = useUserOrdersFactory<BapiOrder, BapiOrderSearchParams>(params);

export default useUserOrders;
