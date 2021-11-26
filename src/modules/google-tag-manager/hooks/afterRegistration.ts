import Vue from 'vue'
import VueGtm from 'vue-gtm'
import { Store } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { isServer } from '@vue-storefront/core/helpers'

export const isEnabled = (gtmId: string | null) => {
  return typeof gtmId === 'string' && gtmId.length > 0 && !isServer
}

export function afterRegistration (config, store: Store<any>) {
  if (isEnabled(config.googleTagManager.id)) {
    const GTM: VueGtm = (Vue as any).gtm

    const storeView = currentStoreView()
    const currencyCode = storeView.i18n.currencyCode

    const getProduct = (item) => {
      let product = {}

      const attributeMap: string[]|Record<string, any>[] = config.googleTagManager.product_attributes
      attributeMap.forEach(attribute => {
        const isObject = typeof attribute === 'object'
        let attributeField = isObject ? Object.keys(attribute)[0] : attribute
        let attributeName = isObject ? Object.values(attribute)[0] : attribute

        if (item.hasOwnProperty(attributeField) || product.hasOwnProperty(attributeName)) {
          const value = item[attributeField] || product[attributeName]
          if (value) {
            product[attributeName] = value
          }
        }
      })

      const { category } = item
      if (category && category.length > 0) {
        product['category'] = category.slice(-1)[0].name
      }

      return product
    }

    store.subscribe(({ type, payload }, state) => {
      // Adding a Product to a Shopping Cart
      if (type === 'cart/cart/ADD') {
        GTM.trackEvent({
          event: 'addToCart',
          'addToCart.productID': payload.product.id,
          'addToCart.productSKU': payload.product.sku
        });
      }

      // Removing a Product from a Shopping Cart
      if (type === 'cart/cart/DEL') {
        GTM.trackEvent({
          event: 'removeFromCart',
          ecommerce: {
            remove: {
              products: [getProduct(payload.product)]
            }
          }
        });
      }
    })
  }
}
