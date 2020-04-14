/* istanbul ignore file */

import { useUserOrdersFactory, UseUserOrdersFactoryParams } from '@vue-storefront/core';
import { BapiOrder, BapiOrderSearchParams } from '../../types';
import { SearchResult } from '@vue-storefront/core';

// @todo userOrders

const params: UseUserOrdersFactoryParams<BapiOrder, BapiOrderSearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (params: BapiOrderSearchParams = {}): Promise<SearchResult<BapiOrder>> => new Promise(() => ({}))
};

const useUserOrders: () => any = useUserOrdersFactory<BapiOrder, BapiOrderSearchParams>(params);

export default useUserOrders;
