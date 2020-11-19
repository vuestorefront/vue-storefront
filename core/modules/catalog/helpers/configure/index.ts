import getAndCallAsyncDefault from '@vue-storefront/core/helpers/getAndCallAsyncDefault';

export const configureProducts = getAndCallAsyncDefault(() => import(/* webpackChunkName: "vsf-catalog-helper-configureProducts" */ './configureProducts'));
