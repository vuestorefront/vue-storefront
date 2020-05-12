import config from 'config'
import i18n from '@vue-storefront/core/i18n';
import { SearchQuery } from 'storefront-query-builder'

export const filterChangedProduct = async (filterOption, store, router) => {
  const currentProductConfiguration = store.getters['product/getCurrentProductConfiguration']
  const changedConfig = Object.assign({}, currentProductConfiguration, { [filterOption.attribute_code]: filterOption })
  let searchQuery = new SearchQuery()
  searchQuery = searchQuery.applyFilter({key: 'sku', value: {'eq': store.getters['product/getCurrentProduct'].parentSku}})
  const { items: [newVariant] } = await store.dispatch('product/findProducts', {
    query: searchQuery,
    size: 1,
    configuration: changedConfig,
    prefetchGroupProducts: true,
    setFirstVariantAsDefaultInURL: config.products.setFirstVarianAsDefaultInURL,
    fallbackToDefaultWhenNoAvailable: false,
    setProductErrors: true,
    assignProductConfiguration: true
  })
  if (config.products.setFirstVarianAsDefaultInURL && newVariant) {
    router.push({ params: { childSku: newVariant.sku } })
  }
  if (newVariant) {
    await store.dispatch('product/setCurrent', newVariant)
    return newVariant
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
