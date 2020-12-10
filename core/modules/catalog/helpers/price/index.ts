import getAndCallAsyncDefault from '@vue-storefront/core/helpers/getAndCallAsyncDefault';

export const doPlatformPricesSync = getAndCallAsyncDefault(() => import(/* webpackChunkName: "vsf-catalog-helper-doPlatformPricesSync" */ './doPlatformPricesSync'))
