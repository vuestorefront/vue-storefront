import getAndCallAsyncDefault from '@vue-storefront/core/helpers/getAndCallAsyncDefault';

export const setGroupedProduct = getAndCallAsyncDefault(() => import(/* webpackChunkName: "vsf-catalog-helper-pack-setLinkableProducts" */ './setGroupedProduct'));
export const setBundleProducts = getAndCallAsyncDefault(() => import(/* webpackChunkName: "vsf-catalog-helper-pack-setLinkableProducts" */ './setBundleProducts'));
export const getAttributesFromMetadata = getAndCallAsyncDefault(() => import(/* webpackChunkName: "vsf-catalog-helper-getAttributesFromMetadata" */ './getAttributesFromMetadata'));
