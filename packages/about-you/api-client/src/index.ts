/* istanbul ignore file */

import { apiClientFactory } from '@vue-storefront/core';
import { BapiClient } from '@aboutyou/backbone';

let apiClient: BapiClient|null = null;

const { setup, override, update, getSettings } = apiClientFactory<any, any>({
  defaultSettings: {
    locale: 'en',
    currency: '',
    country: '',
    countries: [],
    currencies: [],
    locales: []
  },
  onSetup: () => {
    // todo: add possibility to override
    // todo: move credentials to settings
    apiClient = new BapiClient({
      host: 'https://boston.backbone-api.demo.aboutyou.cloud/v1/',
      auth: { username: 'aboutyou',
        password: 'OmNErAb96Y5Qn75SFhXr' },
      shopId: 121
    });
  }
});

export const getCart: typeof BapiClient.prototype.basket.get = (...args) => apiClient.basket.get(...args);
export const addItemToCart: typeof BapiClient.prototype.basket.addItem = (...args) => apiClient.basket.addItem(...args);
export const deleteItemFromCart: typeof BapiClient.prototype.basket.deleteItem = (...args) => apiClient.basket.deleteItem(...args);
export const updateItemInCart: typeof BapiClient.prototype.basket.updateItem = (...args) => apiClient.basket.updateItem(...args);
export const bulkUpdateItemsInCart: typeof BapiClient.prototype.basket.addOrUpdateItems = (...args) => apiClient.basket.addOrUpdateItems(...args);
export const getCategoryById: typeof BapiClient.prototype.categories.getById = (...args) => apiClient.categories.getById(...args);
export const getCategoriesByIds: typeof BapiClient.prototype.categories.getByIds = (...args) => apiClient.categories.getByIds(...args);
export const getCategoryByPath: typeof BapiClient.prototype.categories.getByPath = (...args) => apiClient.categories.getByPath(...args);
export const getCategoryRoots: typeof BapiClient.prototype.categories.getRoots = (...args) => apiClient.categories.getRoots(...args);
export const getFilters: typeof BapiClient.prototype.filters.get = (...args) => apiClient.filters.get(...args);
export const getFiltersValues: typeof BapiClient.prototype.filters.getValues = (...args) => apiClient.filters.getValues(...args);
export const getProductById: typeof BapiClient.prototype.products.getById = (...args) => apiClient.products.getById(...args);
export const getProductsByIds: typeof BapiClient.prototype.products.getByIds = (...args) => apiClient.products.getByIds(...args);
export const getProductsByQuery: typeof BapiClient.prototype.products.query = (...args) => apiClient.products.query(...args);
export const getSearchSuggestions: typeof BapiClient.prototype.search.suggestions = (...args) => apiClient.search.suggestions(...args);
export const getSearchMappings: typeof BapiClient.prototype.search.mappings = (...args) => apiClient.search.mappings(...args);
export const getVariantsByIds: typeof BapiClient.prototype.variants.getByIds = (...args) => apiClient.variants.getByIds(...args);
export const getWishlist: typeof BapiClient.prototype.wishlist.get = (...args) => apiClient.wishlist.get(...args);
export const addItemToWishlist: typeof BapiClient.prototype.wishlist.addItem = (...args) => apiClient.wishlist.addItem(...args);
export const deleteItemFromWishlist: typeof BapiClient.prototype.wishlist.deleteItem = (...args) => apiClient.wishlist.deleteItem(...args);

export {
  getSettings,
  override,
  setup,
  update
};

