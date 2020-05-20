import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { PRODUCT_SET_CURRENT_CONFIGURATION, PRODUCT_SET_CURRENT } from './store/product/mutation-types'
import omit from 'lodash-es/omit'
import config from 'config'
import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import { Logger } from '@vue-storefront/core/lib/logger';
import { isServer } from '@vue-storefront/core/helpers';
import { router } from '@vue-storefront/core/app'

// Listeners moved from Product.js

const prefixMutation = (mutationKey) => `product/${mutationKey}`

export const productAfterPriceupdate = async (product, store) => {
  if (store.getters['product/getCurrentProduct'] && product.sku === store.getters['product/getCurrentProduct'].sku) {
    // join selected variant object to the store
    await store.dispatch('product/setCurrent', omit(product, ['name']))
  }
}

export const filterChangedProduct = async (filterOption, store, router) => {
  EventBus.$emit('product-before-configure', { filterOption: filterOption, configuration: store.getters['product/getCurrentProductConfiguration'] })
  const prevOption = store.getters['product/getCurrentProductConfiguration'][filterOption.attribute_code]
  let changedConfig = Object.assign({}, store.getters['product/getCurrentProductConfiguration'], { [filterOption.attribute_code]: filterOption })
  const selectedVariant = await store.dispatch('product/configure', {
    product: store.getters['product/getCurrentProduct'],
    configuration: changedConfig,
    selectDefaultVariant: true,
    fallbackToDefaultWhenNoAvailable: false,
    setProductErorrs: true
  }, { root: true })
  if (config.products.setFirstVarianAsDefaultInURL) {
    router.push({ params: { childSku: selectedVariant.sku } })
  }
  if (!selectedVariant) {
    if (prevOption) {
      store.commit(prefixMutation(PRODUCT_SET_CURRENT_CONFIGURATION), Object.assign(
        {},
        store.getters['product/getCurrentProductConfiguration'],
        {
          [filterOption.attribute_code]: prevOption
        }
      ), { root: true })
    } else {
      store.commit(prefixMutation(PRODUCT_SET_CURRENT_CONFIGURATION), Object.assign(
        {},
        store.getters['product/getCurrentProductConfiguration'],
        {
          [filterOption.attribute_code]: undefined
        }
      ), { root: true })
    }
  }
}

export const productAfterCustomoptions = async (payload, store) => {
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

  store.commit(prefixMutation(PRODUCT_SET_CURRENT), Object.assign(
    {},
    store.getters['product/getCurrentProduct'],
    {
      price: store.getters['product/getOriginalProduct'].price + priceDelta,
      price_incl_tax: store.getters['product/getOriginalProduct'].price_incl_tax + priceDeltaInclTax
    }
  ), { root: true })
}

export const productAfterBundleoptions = async (payload, store) => {
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
    store.commit(prefixMutation(PRODUCT_SET_CURRENT), Object.assign(
      {},
      store.getters['product/getCurrentProduct'],
      {
        price: priceDelta,
        price_incl_tax: priceDeltaInclTax
      }
    ), { root: true })
  }
}

export const onUserPricesRefreshed = async (store, router) => {
  if (router.currentRoute.params.parentSku) {
    await store.dispatch('product/reset', {}, { root: true })
    await store.dispatch('product/single', {
      options: {
        sku: router.currentRoute.params.parentSku,
        childSku: router && router.currentRoute.params && router.currentRoute.params.childSku ? router.currentRoute.params.childSku : null
      },
      skipCache: true
    }, { root: true })
  }
}

export const checkParentRedirection = (currentProduct, parentProduct) => {
  if (parentProduct && parentProduct.id !== currentProduct.id && config.products.preventConfigurableChildrenDirectAccess) {
    Logger.log('Redirecting to parent, configurable product', parentProduct.sku)()
    parentProduct.parentSku = parentProduct.sku
    parentProduct.sku = currentProduct.sku
    const parentUrl = formatProductLink(parentProduct, currentStoreView().storeCode)
    if (isServer) {
      AsyncDataLoader.push({
        execute: async ({ context }) => {
          if (context && !context.url.includes(parentUrl)) {
            context.server.response.redirect(301, parentUrl)
          }
        }
      })
    } else {
      router.replace(parentUrl as string)
    }
  }
}
