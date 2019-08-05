import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { productModule } from './store/product'
import { attributeModule } from './store/attribute'
import { stockModule } from './store/stock'
import { taxModule } from './store/tax'
import { categoryModule } from './store/category'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import omit from 'lodash-es/omit'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import config from 'config'
import { isUserGroupedTaxActive } from '@vue-storefront/core/modules/catalog/helpers/tax';
import { PRODUCT_SET_CURRENT_CONFIGURATION, PRODUCT_SET_CURRENT } from './store/product/mutation-types';

export const CatalogModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  StorageManager.init('categories')
  StorageManager.init('attributes')
  StorageManager.init('products')
  StorageManager.init('elasticCache', true, appConfig.server.elasticCacheQuota)

  store.registerModule('product', productModule)
  store.registerModule('attribute', attributeModule)
  store.registerModule('stock', stockModule)
  store.registerModule('tax', taxModule)
  store.registerModule('category', categoryModule)

  // Things moved from Product.js
  EventBus.$on('product-after-priceupdate', async (product) => {
    if (store.getters['product/getCurrentProduct'] && product.sku === store.getters['product/getCurrentProduct'].sku) {
      // join selected variant object to the store
      await store.dispatch('product/setCurrent', omit(product, ['name']))
    }
  })

  EventBus.$on('filter-changed-product', async (filterOption) => {
    EventBus.$emit('product-before-configure', { filterOption: filterOption, configuration: store.getters['product/getCurrentProductConfiguration'] })
    const prevOption = store.getters['product/getCurrentProductConfiguration'][filterOption.attribute_code]
    let changedConfig = Object.assign({}, store.getters['product/getCurrentProductConfiguration'], {[filterOption.attribute_code]: filterOption})
    const selectedVariant = await store.dispatch('product/configure', {
      product: store.getters['product/getCurrentProduct'],
      configuration: changedConfig,
      selectDefaultVariant: true,
      fallbackToDefaultWhenNoAvailable: false,
      setProductErorrs: true
    })
    if (config.products.setFirstVarianAsDefaultInURL) {
      router.push({params: { childSku: selectedVariant.sku }})
    }
    if (!selectedVariant) {
      if (prevOption) {
        store.commit(PRODUCT_SET_CURRENT_CONFIGURATION, Object.assign(
          {},
          store.getters['product/getCurrentProductConfiguration'],
          {
            [filterOption.attribute_code]: prevOption
          }
        ))
      } else {
        store.commit(PRODUCT_SET_CURRENT_CONFIGURATION, Object.assign(
          {},
          store.getters['product/getCurrentProductConfiguration'],
          {
            [filterOption.attribute_code]: undefined
          }
        ))
      }
    }
  })

  EventBus.$on('product-after-customoptions', async (payload) => {
    let priceDelta = 0
    let priceDeltaInclTax = 0
    const optionValues: any[] = Object.values(payload.optionValues)
    optionValues.forEach(optionValue => {
      if (optionValue && parseInt(optionValue.option_type_id) > 0) {
        if (optionValue.price_type === 'fixed' && optionValue.price !== 0) {
          priceDelta += optionValue.price
          priceDeltaInclTax += optionValue.price
        }
        if (optionValue.price_type === 'percent' && optionValue.price !== 0) {
          priceDelta += ((optionValue.price / 100) * store.getters['product/getOriginalProduct'].price)
          priceDeltaInclTax += ((optionValue.price / 100) * store.getters['product/getOriginalProduct'].price_incl_tax)
        }
      }
    })
    store.commit(PRODUCT_SET_CURRENT, Object.assign(
      {},
      store.getters['product/getCurrentProduct'],
      {
        price: store.getters['product/getOriginalProduct'].price + priceDelta,
        price_incl_tax: store.getters['product/getOriginalProduct'].price_incl_tax + priceDeltaInclTax
      }
    ))
  })

  EventBus.$on('product-after-bundleoptions', async (payload) => {
    let priceDelta = 0
    let priceDeltaInclTax = 0
    const optionValues: any[] = Object.values(payload.optionValues)
    optionValues.forEach(optionValue => {
      if (optionValue && optionValue.value && optionValue.product && parseInt(optionValue.qty) >= 0) {
        priceDelta += optionValue.value.product.price * parseInt(optionValue.qty)
        priceDeltaInclTax += optionValue.value.product.price_incl_tax * parseInt(optionValue.qty)
      }
    })
    if (priceDelta > 0) {
      store.commit(PRODUCT_SET_CURRENT, Object.assign(
        {},
        store.getters['product/getCurrentProduct'],
        {
          price: priceDelta,
          price_incl_tax: priceDeltaInclTax
        }
      ))
    }
  })

  const onUserPricesRefreshed = async () => {
    if (router.currentRoute.params.parentSku) {
      await store.dispatch('product/reset')
      await store.dispatch('product/single', {
        options: {
          sku: router.currentRoute.params.parentSku,
          childSku: router && router.currentRoute.params && router.currentRoute.params.childSku ? router.currentRoute.params.childSku : null
        },
        skipCache: true
      })
    }
  }

  if (config.usePriceTiers || isUserGroupedTaxActive()) {
    EventBus.$on('user-after-loggedin', onUserPricesRefreshed)
    EventBus.$on('user-after-logout', onUserPricesRefreshed)
  }
}
