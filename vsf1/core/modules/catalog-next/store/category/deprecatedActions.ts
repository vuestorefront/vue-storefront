import { currentStoreView, localizedDispatcherRoute, localizedDispatcherRouteName } from '@vue-storefront/core/lib/multistore'
import { preConfigureProduct } from '@vue-storefront/core/modules/catalog/helpers/search'
import omit from 'lodash-es/omit'
import config from 'config'
const { configureProductAsync } = require('@vue-storefront/core/modules/catalog/helpers')

const actions = {
  /**
   * Calculates products taxes
   * Registers URLs
   * Configures products
   */
  async processCategoryProducts ({ dispatch, rootState }, { products = [], filters = {} } = {}) {
    dispatch('registerCategoryProductsMapping', products) // we don't need to wait for this
    const configuredProducts = await dispatch('configureProducts', { products, filters })
    return dispatch('tax/calculateTaxes', { products: configuredProducts }, { root: true })
  },
  /**
   * Configure configurable products to have first available options selected
   * so they can be added to cart/wishlist/compare without manual configuring
   */
  async configureProducts ({ rootState }, { products = [], filters = {}, populateRequestCacheTags = config.server.useOutputCacheTagging } = {}) {
    return products.map(product => {
      product = Object.assign({}, preConfigureProduct({ product, populateRequestCacheTags }))
      const configuredProductVariant = configureProductAsync({ rootState, state: { current_configuration: {} } }, { product, configuration: filters, selectDefaultVariant: false, fallbackToDefaultWhenNoAvailable: true, setProductErorrs: false })
      return Object.assign(product, omit(configuredProductVariant, ['visibility']))
    })
  },
  async registerCategoryProductsMapping ({ dispatch }, products = []) {
    const { storeCode, appendStoreCode } = currentStoreView()
    await Promise.all(products.map(product => {
      const { url_path, sku, slug, type_id } = product
      return dispatch('url/registerMapping', {
        url: localizedDispatcherRoute(url_path, storeCode),
        routeData: {
          params: {
            parentSku: product.parentSku || product.sku,
            slug
          },
          'name': localizedDispatcherRouteName(type_id + '-product', storeCode, appendStoreCode)
        }
      }, { root: true })
    }))
  }
}

export default actions
