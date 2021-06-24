import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { PRODUCT_SET_CURRENT } from './store/product/mutation-types'
import omit from 'lodash-es/omit'
import config from 'config'
import i18n from '@vue-storefront/core/i18n';
import { SearchQuery } from 'storefront-query-builder'
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
  const currentProductConfiguration = store.getters['product/getCurrentProductConfiguration']
  const changedConfig = Object.assign({}, currentProductConfiguration, { [filterOption.attribute_code]: filterOption })
  let searchQuery = new SearchQuery()
  searchQuery = searchQuery.applyFilter({ key: 'sku', value: { 'eq': store.getters['product/getCurrentProduct'].parentSku } })
  const { items: [newProductVariant] } = await store.dispatch('product/findProducts', {
    query: searchQuery,
    size: 1,
    configuration: changedConfig,
    options: {
      fallbackToDefaultWhenNoAvailable: false,
      setProductErrors: true,
      assignProductConfiguration: true,
      separateSelectedVariant: true
    }
  }, { root: true })
  const { configuration, selectedVariant, options, product_option } = newProductVariant
  const routeProp = config.seo.useUrlDispatcher ? 'query' : 'params';

  if (config.products.setFirstVarianAsDefaultInURL && selectedVariant) {
    router.push({ [routeProp]: { childSku: selectedVariant.sku } })
  }
  if (selectedVariant) {
    const newProductConfiguration = Object.assign(
      {},
      store.getters['product/getCurrentProduct'],
      selectedVariant,
      { configuration, options, product_option }
    )
    await store.dispatch('product/setCurrent', newProductConfiguration)
    EventBus.$emit('product-after-configure', { product: newProductConfiguration, configuration: configuration, selectedVariant: selectedVariant })

    if (router?.currentRoute?.[routeProp]?.childSku) {
      router.push(
        {
          [routeProp]: {
            ...router.currentRoute[routeProp],
            childSku: selectedVariant.sku
          }
        }
      )
    }
    return selectedVariant
  } else {
    store.dispatch('notification/spawnNotification', {
      type: 'warning',
      message: i18n.t(
        'No such configuration for the product. Please do choose another combination of attributes.'
      ),
      action1: { label: i18n.t('OK') }
    })
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
        priceDelta += ((optionValue.price / 100) * store.getters['product/getCurrentProduct'].price)
        priceDeltaInclTax += ((optionValue.price / 100) * store.getters['product/getCurrentProduct'].price_incl_tax)
      }
    }
  })

  store.commit(prefixMutation(PRODUCT_SET_CURRENT), Object.assign(
    {},
    store.getters['product/getCurrentProduct'],
    {
      price: store.getters['product/getCurrentProduct'].price + priceDelta,
      price_incl_tax: store.getters['product/getCurrentProduct'].price_incl_tax + priceDeltaInclTax
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
