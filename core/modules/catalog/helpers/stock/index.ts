import getStatus from './getStatus'
import getProductInfos from './getProductInfos'
import filterOutUnavailableVariants from './filterOutUnavailableVariants'
import getAndCallAsyncDefault from '@vue-storefront/core/helpers/getAndCallAsyncDefault';

export {
  getStatus,
  getProductInfos,
  filterOutUnavailableVariants
}

export const getStockItems = getAndCallAsyncDefault(() => import(/* webpackChunkName: "vsf-catalog-helper-configureProducts" */ './getStockItems'));
