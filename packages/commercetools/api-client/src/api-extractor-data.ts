/**
 * `api-client` for commercetools integration for Vue Storefront 2.
 *
 * @remarks
 * The `@vue-storefront/commercetools-api` library includes everything needed to fetch data from the
 * commercetools eCommerce platform. This includes API client configuration, API endpoints, and
 * GraphQL types and fragments.
 *
 * @packageDocumentation
 */

import * as apiMethods from './api';

export * from './index';
export { apiMethods };
export { GetStoresParams } from './api/getStores';
export { CategoryData } from './api/getCategory';
export { GetInventoryParams } from './api/getInventory';
export { GetMeParams, OrdersData } from './api/getMe';
export { ProductData } from './api/getProduct';
export { ShippingMethodData } from './api/getShippingMethods';
export { UpdateCartParams } from './api/updateCart';
